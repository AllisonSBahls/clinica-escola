const Master = require('../model/Master');
const Permission = require('../model/Permissoes');
const bcrypt = require('bcryptjs');
const User = require('../model/User')
class MasterController {

    form_admin_master(req, res) {
        res.render("forms/form_register_master", { erros: {} })
    }

    async master_register(req, res) {

        const { email, name, phone } = req.body;
        //Verificar Email Existente
        const emailUser = await User.findAll({
            where: { email: email }
        })

        var generateHash = function (password) {
            return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
        };
        var masterPassword = generateHash(req.body.password);

        //Validar formulario
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
        }

        else {
            const user = await User.create({
                email,
                password: masterPassword,
                NivelPermissaoId: 1
            });
            //Registrar informações pessoais do supervisor
            Master.create({
                name,
                phone,
                userMasterId: user.id
            }).then(() => {
                res.redirect('/supervisor');
                req.flash("success_msg", "Supervisor cadastrado com sucesso");

            }).catch((err) => {
                req.flash('error_msg', 'Houve um erro ao salvar o supervisor');
                res.redirect('/')
            })
        }
    }
    masters(req, res) {
        Master.findAll({
            include: [{
                model: User, as: 'userMaster'
            }]
        })
            .then(function (masters) {
                res.render("pages/master", { masters: masters })
            });
    }

    deleteMaster(req, res) {
        Master.destroy({
            where: { 'id': req.params.id }
        }).then(function () {
            res.redirect('/supervisor');
        }).catch(function (erro) {
            res.send("erro" + erro);
        })
    }

    profileMaster(req, res) {
        Master.findAll({
            where: { 'id': req.params.id },
            include: [{
                model: User, as: 'userMaster',
            },]
        }).then((master) => {
            res.render("forms/form_profile_master", { master: master });

        }).catch((erro) => {
            res.send("erro" + erro);
        })
    }

    async updateMaster(req, res) {
        const emailUser = await User.findAll({
            where: { id: parseInt(req.body.idUser) }
        })

        if (emailUser.email == req.body.email) {
            Master.update({
                name: req.body.name,
                phone: req.body.phone,
            },
                { where: { 'id': req.params.id } }
            ).then(function () {
                res.redirect('/supervisor');
            })
        } else {
            const newEmail = await User.findAll({
                where: { email: req.body.email }
            })
            if (newEmail > 0) {
                req.flash('error_msg', 'Email já existe');
                res.render('/supervisor/register')
            } else {
                const user = User.update({
                    email: req.body.email
                }, {
                    where: { id: parseInt(req.body.idUser) }
                });

                Master.update({
                    name: req.body.name,
                    phone: req.body.phone,
                },
                    { where: { 'id': req.params.id } }
                ).then(function () {
                    res.redirect('/supervisor');
                })
            }
        }

    }
}

module.exports = MasterController;