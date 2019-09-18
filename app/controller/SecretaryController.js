const Secretary = require('../model/Secretary');
const Permission = require('../model/Permissoes');
const User = require('../model/User');
const bcrypt = require('bcryptjs');

class SecretaryController {

    form_admin_secretary(req, res) {
        Permission.findAll()
            .then(function (permissoes) {
                res.render("forms/form_register_secretary", { permissoes: permissoes })
            });
    }

    async secretary_register(req, res) {

        //Criptografa a Senha
        var generateHash = function (password) {
            return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
        };
        var secretaryPassword = generateHash(req.body.password);

        const { email, name, phone } = req.body;
        //Verificar Email Existente
        const emailUser = await User.findAll({
            where: { email: email }
        })

        var erros = [];
        if (emailUser.length > 0) {
            erros.push({ texto: 'E-mail já esta sendo utilizado' })
        }
        if (!req.body.name || typeof req.body.name == undefined || req.body.name == null) {
            erros.push({ texto: 'Nome invalido' })
        }
        if (!req.body.email || typeof req.body.email == undefined || req.body.email == null) {
            erros.push({ texto: 'E-mail invalido' })
        }
        if (!req.body.password || typeof req.body.password == undefined || req.body.password == null) {
            erros.push({ texto: 'Senha invalida' })
        }
        if (erros.length > 0) {
            res.render('forms/form_register_master', { erros: erros })
        } else {
            //Registrar o usuario do supervisor
            const user = await User.create({
                email: email,
                password: secretaryPassword,
                NivelPermissaoId: 2
            });

            //Registrar informações pessoais do supervisor
            Secretary.create({
                name,
                phone,
                userSecretaryId: user.id
            }).then(function () {
                req.flash("success_msg", "Recepcionista cadastrada com sucesso");
                res.redirect('/recepcionista');
            }).catch(function (erro) {
                req.flash("error_msg", "Ocorreu um erro ao salvar a recepcionista");
                res.send("erro" + erro);
            })
        }
    }

    secretaries(req, res) {
        Secretary.findAll({
            include: [{
                model: User, as: 'userSecretary'
            }]
        })
            .then(function (secretaries) {
                res.render("pages/secretary", { secretaries: secretaries })
            });
    }

    deleteSecretary(req, res) {
        Secretary.destroy({
            where: { 'id': req.params.id }
        }).then(function () {
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