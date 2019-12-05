const Master = require('../model/Master');
const hash = require('../common/generateHash');
const validate = require('../common/validateFields');
const User = require('../model/User')
const Secretary = require('../model/Secretary');

/**
 * Biblioteca do controlador supervisor
 */
class MasterController {

    /**
     * Função para cadastrar o usuário
     * @param {*} req Argumento de solicitação HTTP para a função de middleware, chamado de "req" por convenção.
     * @param {*} res Argumento de resposta HTTP para a função de middleware, chamado de "res" por convenção.
     */
    async form_admin_master(req, res) {
        const secretaryProfile = await Secretary.searchProfileSecretary(req);
        const masterProfile = await Master.searchProfileMaster(req);

        res.render("forms/register/form-register-master", { erros: {}, masterProfile: masterProfile, secretaryProfile:secretaryProfile })
    }
    async registerMaster(req, res) {
        const masterProfile = await Master.searchProfileMaster(req);
        const secretaryProfile = await Secretary.searchProfileSecretary(req);

        const { email, name, phone, password } = req.body;
        //Verificar Email Existente
        var secretPassword = hash.generateHash(password);
        //Verificar Email Existente
        const emailUser = await User.verifyEmail(email)
        //Validar os campos
        const erros = validate.validateFields(emailUser, email, name, password);

        if (erros) {
            res.render('forms/register/form-register-master', { erros: erros, masterProfile: masterProfile, secretaryProfile:secretaryProfile  })
        }
        else {
            //Registrar informações do supervisor
           await Master.insertUserMaster(email, secretPassword, name, phone).then(() => {
                req.flash("success_msg", "Supervisor cadastrado com sucesso");
                res.redirect('/supervisor');
            }).catch((err) => {
                req.flash('error_msg', 'Houve um erro ao salvar o supervisor');
                res.send('err', err)
            })
        }
    }
    async masters(req, res) {
        const secretaryProfile = await Secretary.searchProfileSecretary(req);
        const masterProfile = await Master.searchProfileMaster(req);

        Master.searchMasters().then(function (masters) {
                res.render("pages/master", { masters: masters, masterProfile: masterProfile, secretaryProfile:secretaryProfile })
            }).catch((err)=>{
                res.send(err)
            });
    }

    searchNameMasters(req, res){
        var campo = '%' + req.body.nameMaster + '%';
        Master.searchNameMaster(campo).then((master)=>{
           res.send(master)
        }).catch((err) =>{
            res.send(err);
        })
    }


    deleteMaster(req, res) {
        Master.deleteMaster(req.params.id).then(function () {
            req.flash("success_msg", "Supervisor deletado com sucesso");
            res.redirect('/supervisor');;
        }).catch(function (erro) {
            res.send("erro" + erro);
        })
    }

    async profileMaster(req, res) {
        const masterProfile = await Master.searchProfileMaster(req);
        const secretaryProfile = await Secretary.searchProfileSecretary(req);

        Master.searchOneMaster(req.params.id).then((master) => {
            res.render("forms/form_profile_master", {secretaryProfile:secretaryProfile, master: master, masterProfile: masterProfile });
        }).catch((erro) => {
            res.send("erro" + erro);
        })
    }

    async updateMaster(req, res) {
        let {email, name, phone, idUser} = req.body;
        
        const emailUser = await User.searchEmailUserUpdate(idUser)
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
                          req.flash("error_msg", "Ocorreu um erro ao alterar o paciente");
                    res.redirect('/user/perfil');
                });
            }
        }
    }

    async editMaster(req, res) {
        let {email, name, phone, idUser} = req.body;
        const masterProfile = await Master.searchProfileMaster(req);
        const emailUser = await User.searchEmailUserUpdate(idUser)
        //Verifica se o usuário manteve o e-mail;
        if (emailUser.email == email) {
            Master.editProfileMaster(name, phone, masterProfile.id).then(function () {
                req.flash('success_msg', 'Supervisor alterado com sucesso');
                res.redirect('/user/perfil');
            }).catch((err)=>{
                res.send('err', err)
            });
        }else {
            const emailExist = await User.verifyEmail(email);
            if(emailExist.length >  0){
                req.flash('error_msg', 'E-mail já existe');
                res.redirect('/user/perfil');
            }else{
                await User.updateEmailUser(idUser, email);
                Master.editProfileMaster(name, phone, masterProfile.id).then(function () {
                    req.flash('success_msg', 'Supervisor alterado com sucesso');
                    res.redirect('/user/perfil');
                }).catch((err)=>{
                          req.flash("error_msg", "Ocorreu um erro ao alterar o paciente");
                    res.redirect('/user/perfil');
                });
            }
        }
    }

}

module.exports = MasterController;