const Master = require('../model/Master');
const Permission = require('../model/Permissoes');
const User = require('../model/User');
const bcrypt = require('bcryptjs');
class MasterController {

    form_admin_master(req, res) {
        Permission.findAll()
            .then(function (permissoes) {
                res.render("forms/form_register_master", { permissoes: permissoes })
            });
    }

    async master_register(req, res) {

        var generateHash = function (password) {
            return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
        };
        var masterPassword = generateHash(req.body.password);

        //Registrar o usuario do supervisor
        const { email } = req.body;
        const user = await User.create({
            email: email,
            password: masterPassword,
            NivelPermissaoId: 1
        });

        //Registrar informações pessoais do supervisor
        Master.create({
            name: req.body.name,
            phone: req.body.phone,
            userMasterId: user.id
        }).then(function () {
            res.redirect('/supervisor');
        }).catch(function (erro) {
            res.send("erro" + erro);
        })
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
        User.update({ 
            email : req.body.email
        },
        {where: { id: req.params.idUser }}
        ).then(function () {
            res.redirect('/supervisor');
        }).catch(function (erro) {
            res.send("erro" + erro);
        })


        Master.update({
            name: req.body.name,
            phone: req.body.phone,
            userMasterId: user.id
        },
        { where: { 'id': req.params.id } }
        ).then(function () {
            res.redirect('/supervisor');
        }).catch(function (erro) {
            res.send("erro" + erro);
        })
    }
}

module.exports = MasterController;