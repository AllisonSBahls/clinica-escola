const Master = require('../model/Master');
const hash = require('../common/generateHash');
const validate = require('../common/validateFields');
const User = require('../model/User')
const Secretary = require('../model/Secretary');

class MasterController {

    async form_admin_master(req, res) {
        const secretaryrProfile = await Secretary.searchProfileSecretary(req);
        const masterProfile = await Master.searchProfileMaster(req);

        res.render("forms/form_register_master", { erros: {}, masterProfile: masterProfile, secretaryrProfile:secretaryrProfile })
    }
    async registerMaster(req, res) {
        const masterProfile = await Master.searchProfileMaster(req);
        const secretaryrProfile = await Secretary.searchProfileSecretary(req);

        const { email, name, phone, password } = req.body;
        //Verificar Email Existente
        var secretPassword = hash.generateHash(password);
        //Verificar Email Existente
        const emailUser = await User.verifyEmail(email)
        //Validar os campos
        const erros = validate.validateFields(emailUser, email, name, password);

        if (erros) {
            res.render('forms/form_register_master', { erros: erros, masterProfile: masterProfile, secretaryrProfile:secretaryrProfile  })
        }
        else {
            //Registrar informações do supervisor
            Master.insertUserMaster(email, secretPassword, name, phone).then(() => {
                req.flash("success_msg", "Supervisor cadastrado com sucesso");
                res.redirect('/supervisor');
            }).catch((err) => {
                req.flash('error_msg', 'Houve um erro ao salvar o supervisor');
                res.send('err', err)
            })
        }
    }
    async masters(req, res) {
        const secretaryrProfile = await Secretary.searchProfileSecretary(req);
        const masterProfile = await Master.searchProfileMaster(req);

        Master.searchMasters().then(function (masters) {
                res.render("pages/master", { masters: masters, masterProfile: masterProfile, secretaryrProfile:secretaryrProfile })
            }).catch((err)=>{
                res.send(err)
            });
    }

    deleteMaster(req, res) {
        Master.deleteMaster(req.params.id).then(function () {
            req.flash("success_msg", "Supervisor deletado com sucesso");
            res.redirect('/supervisor');;
        }).catch(function (erro) {
            res.send("erro" + erro);
        })
    }

    profileMaster(req, res) {
        const masterProfile = Master.findOne({
            where: {userMasterId: req.user.id} });

        Master.searchOneMaster(req.params.id).then((master) => {
            res.render("forms/form_profile_master", { master: master, masterProfile: masterProfile });
        }).catch((erro) => {
            res.send("erro" + erro);
        })
    }

    async updateMaster(req, res) {
        let {email, name, phone, idUser} = req.body;
        
        const emailUser = await User.searchEmailUser(idUser)

        //Verifica se o usuário manteve o e-mail;
        if (emailUser.email == email) {
            Master.updateProfileMaster(name, phone, req.params.id).then(function () {
                req.flash('success_msg', 'Supervisor alterado com sucesso');
                res.redirect('/supervisor');
            }).catch((err)=>{
                res.send('err', err)
            });
        }else {
            const emailExist = await User.verifyEmail(email);
            if(emailExist.length >  0){
                req.flash('error_msg', 'E-mail já existe');
                res.redirect('/supervisor');
            }else{
                await User.updateEmailUser(idUser, email);
                Master.updateProfileMaster(name, phone, req.params.id).then(function () {
                    req.flash('success_msg', 'Supervisor alterado com sucesso');
                    res.redirect('/supervisor');
                }).catch((err)=>{
                    res.send('err', err)
                });
            }
        }
    }


}

module.exports = MasterController;