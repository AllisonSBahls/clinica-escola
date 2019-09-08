const Master = require('../model/Master');
const Permission = require('../model/Permissoes');

class MasterController {

    form_admin_master(req, res) {
        Permission.findAll()
            .then(function (permissoes) {
                res.render("forms/form_admin_master", { permissoes: permissoes })
            });
    }

    master_register(req, res) {
        Master.create({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password,
            permissionID: req.body.permissionID

        }).then(function () {
            res.redirect('/master');
        }).catch(function (erro) {
            res.send("erro" + erro);
        })
    }

    master(req, res) {
        Master.findAll()
            .then(function (masters) { // a variavel dentro de permissoes recebera todas as informações da master
                res.render("pages/master", { masters: masters })
            });
    }

    deleteMaster(req, res) {
        Master.destroy({
            where: { 'id': req.params.id }
        }).then(function () {
            res.redirect('/master');
        }).catch(function (erro) {
            res.send("erro" + erro);
        })
    }

    profileMaster(req, res) {
        Permission.findAll().
            then((permissoes) => {
                Master.findAll({
                    where: { 'id': req.params.id }
                }).then((master) => {
                    res.render("forms/form_profile_master", { master: master, permissoes: permissoes });

                })
            }).catch((erro) => {
                res.send("erro" + erro);
            })

    }

    updateMaster(req, res) {
        Master.update(
            {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                permissionID: req.body.permissionID
            },
            { where: { 'id': req.params.id } }
        ).then((master) => {
            res.redirect("/master");
        }).catch((erro) => {
            res.send("erro" + erro);
        })
    }

}

module.exports = MasterController;