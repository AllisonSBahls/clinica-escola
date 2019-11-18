const Secretary = require('../model/Secretary');
const Permission = require('../model/Permissoes');
const User = require('../model/User');
const Master = require('../model/Master');
const hash = require('../common/generateHash');
const validate = require('../common/validateFields');

class SecretaryController {

    async form_admin_secretary(req, res) {
        const secretaryProfile = await Secretary.searchProfileSecretary(req);
        const masterProfile = await Master.searchProfileMaster(req);

        Permission.findAll()
            .then(function (permissoes) {
                res.render("forms/form_register_secretary", { permissoes: permissoes, masterProfile:masterProfile, secretaryProfile:secretaryProfile  })
            });
    }

    async registerSecretary(req, res) {
        const secretaryProfile = await Secretary.searchProfileSecretary(req);
        const masterProfile = await Master.searchProfileMaster(req);

        const { email, name, phone, password } = req.body;

        //Criptografa a Senha
        var secretPassword = hash.generateHash(password);

        //Verificar Email Existente
        const emailUser = await User.verifyEmail(email)

        const erros = validate.validateFields(emailUser, email, name, password);

        if (erros) {
            res.render('forms/form_register_master', { erros: erros, masterProfile: masterProfile, secretaryProfile:secretaryProfile  })
        } else {
            //Registrar informações pessoais do supervisor
            Secretary.insertSecretary(email, secretPassword, name, phone).then(function () {
                req.flash("success_msg", "Recepcionista cadastrada com sucesso");
                res.redirect('/recepcionista');
            }).catch(function (erro) {
                req.flash("error_msg", "Ocorreu um erro ao salvar a recepcionista");
                res.send("erro" + erro);
            })
        }
    }

    async secretaries(req, res) {
        const secretaryProfile = await Secretary.searchProfileSecretary(req);
        const masterProfile = await Master.searchProfileMaster(req);

        Secretary.searchAllSecretaries().then(function (secretaries) {
                res.render("pages/secretary", { secretaries: secretaries, masterProfile:masterProfile, secretaryProfile:secretaryProfile})
            });
    }


    searchNameSecretary(req, res){
        var campo = '%' + req.body.nameSecretary + '%';
        Secretary.searchNameSecretary(campo).then((secretary)=>{
            res.send(secretary)
        }).catch((err) =>{
            res.send(err);
        })
    }

    deleteSecretary(req, res) {
        Secretary.deleteSecretary(req.params.id).then(function () {
            req.flash("success_msg", "Recepcionista deletada com sucesso");
            res.redirect('/recepcionista');
        }).catch(function (erro) {
            req.flash("error_msg", "Ocorreu um erro ao deletar a recepcionista");
            res.send("erro" + erro);
        })
    }

    async profileSecretary(req, res) {
        const secretaryProfile = await Secretary.searchProfileSecretary(req);
        const masterProfile = await Master.searchProfileMaster(req);
        Secretary.searchOneSecretary(req.params.id).then((secretary) => {
            res.render("forms/form_profile_secretary", { secretary: secretary, masterProfile:masterProfile, secretaryProfile:secretaryProfile });
        }).catch((erro) => {
            res.send("erro" + erro);
        })
    }


    async updateSecretary(req, res) {
        const { email, name, phone, idUser } = req.body;
        const emailUser = await User.searchEmailUserUpdate(idUser)

        if (emailUser.email == email) {
            Secretary.updateSecretary(name, phone, req.params.id).then(function () {
                req.flash("success_msg", "Recepcionista alterada com sucesso");
                res.redirect('/recepcionista');
            }).catch(function (erro) {
                req.flash("error_msg", "Ocorreu um erro ao alterar a recepcionista");
                res.send("erro" + erro);
            })
        }else {
            const emailExist = await User.verifyEmail(email);
            if(emailExist.length >  0){
                req.flash('error_msg', 'E-mail já existe');
                res.redirect('/recepcionista');
            }else{
                await User.updateEmailUser(idUser, email);
                Secretary.updateSecretary(name, phone, req.params.id).then(function () {
                    req.flash("success_msg", "Recepcionista alterada com sucesso");
                    res.redirect('/recepcionista');
                }).catch(function (erro) {
                    req.flash("error_msg", "Ocorreu um erro ao alterar a recepcionista");
                    res.send("erro" + erro);
                })
            }
        }
    }
}


module.exports = SecretaryController;