const Secretary = require('../model/Secretary');
const Permission = require('../model/Permissoes');
const User = require('../model/User');
const Master = require('../model/Master');

const bcrypt = require('bcryptjs');

class SecretaryController {

    async form_admin_secretary(req, res) {
        const secretaryrProfile = await Secretary.searchProfileSecretary(req);
        const masterProfile = await Master.searchProfileMaster(req);

        Permission.findAll()
            .then(function (permissoes) {
                res.render("forms/form_register_secretary", { permissoes: permissoes, masterProfile:masterProfile, secretaryrProfile:secretaryrProfile  })
            });
    }

    async registerSecretary(req, res) {
        const secretaryrProfile = await Secretary.searchProfileSecretary(req);
        const masterProfile = await Master.searchProfileMaster(req);

        const { email, name, phone, password } = req.body;

        //Criptografa a Senha
        var secretPassword = hash.generateHash(password);

        //Verificar Email Existente
        const emailUser = await User.verifyEmail(email)

        const erros = validate.validateFields(emailUser, email, name, password);

        if (erros) {
            res.render('forms/form_register_master', { erros: erros, masterProfile: masterProfile, secretaryrProfile:secretaryrProfile  })
        } else {
            //Registrar o usuario do supervisor
            const user = await User.create({
                email: email,
                password: secretPassword,
                NivelPermissaoId: 2
            });

            //Registrar informações pessoais do supervisor
            Secretary.insertSecretary(email, password, name, phone).then(function () {
                req.flash("success_msg", "Recepcionista cadastrada com sucesso");
                res.redirect('/recepcionista');
            }).catch(function (erro) {
                req.flash("error_msg", "Ocorreu um erro ao salvar a recepcionista");
                res.send("erro" + erro);
            })
        }
    }

    async secretaries(req, res) {
        const secretaryrProfile = await Secretary.searchProfileSecretary(req);
        const masterProfile = await Master.searchProfileMaster(req);

        Secretary.searchAllSecretaries().then(function (secretaries) {
                res.render("pages/secretary", { secretaries: secretaries, masterProfile:masterProfile, secretaryrProfile:secretaryrProfile})
            });
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

    profileSecretary(req, res) {
        Secretary.findAll({
            where: { 'id': req.params.id },
            include: [{
                model: User, as: 'userSecretary',
            },]
        }).then((secretary) => {
            res.render("forms/form_profile_secretary", { secretary: secretary });

        }).catch((erro) => {
            res.send("erro" + erro);
        })
    }


    updateSecretary(req, res) {
        const { email, name, phone } = req.body;
        // const emailUser = await User.findAll({
        //     where: { email: email }
        // })
        // if (emailUser.length > 0) {
        //     console.log('email já existe')
        //     res.redirect('/secretary')
        // } else {
        //     User.update({
        //         email,
        //     },{where: { id: parseInt(req.body.idUser)}});

        //Registrar informações pessoais do supervisor
        Secretary.update({
            name,
            phone,
        }, { where: { 'id': req.params.id } }
        ).then(function () {
            req.flash("success_msg", "Recepcionista alterada com sucesso");
            res.redirect('/recepcionista');
        }).catch(function (erro) {
            req.flash("error_msg", "Ocorreu um erro ao alterar a recepcionista");
            res.send("erro" + erro);
        })
    }
}


module.exports = SecretaryController;