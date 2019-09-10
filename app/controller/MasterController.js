const Master = require('../model/Master');
const Permission = require('../model/Permissoes');
const bcrypt = require('bcryptjs');
class MasterController {

    form_admin_master(req, res) {
        Permission.findAll()
            .then(function (permissoes) {
                res.render("forms/form_register_master", { permissoes: permissoes })
            });
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

        //Registrar o usuario do supervisor
        if (emailUser.length > 0) {
            console.log('email já existe')
            res.redirect('/supervisor/register')

        } else {
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
            }).then(function () {
                res.redirect('/supervisor');
            }).catch(function (erro) {
                res.send("erro" + erro);
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

    updateMaster(req, res) {
        // const user = User.update({
        //     email: req.body.email
        // }, {
        //     where: { id: parseInt(req.body.idUser) }
        // });
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

module.exports = MasterController;