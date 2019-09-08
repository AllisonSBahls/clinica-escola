const Secretary = require('../model/Secretary');
const Permission = require('../model/Permissoes');

class SecretaryController {

    form_admin_secretary(req, res) {
        Permission.findAll()
            .then(function (permissoes) {
                res.render("forms/form_admin_secretary", { permissoes: permissoes })
            });
    }

    secretary_register(req, res) {
        Secretary.create({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password,
            permissionID: req.body.permissionID

        }).then(function () {
            res.redirect('/secretary');
        }).catch(function (erro) {
            res.send("erro" + erro);
        })
    }

    secretary(req, res) {
        Secretary.findAll()
            .then(function (secretaries) { // a variavel dentro de permissoes recebera todas as informações da secretary
                res.render("pages/secretary", { secretaries: secretaries })
            });
    }

    deleteSecretary(req, res) {
        Secretary.destroy({
            where: { 'id': req.params.id }
        }).then(function () {
            res.redirect('/secretary');
        }).catch(function (erro) {
            res.send("erro" + erro);
        })
    }

    profileSecretary(req, res) {
        Permission.findAll().
            then((permissoes) => {
                Secretary.findAll({
                    where: { 'id': req.params.id }
                }).then((secretary) => {
                    res.render("forms/form_profile_secretary", { secretary: secretary, permissoes: permissoes });

                })
            }).catch((erro) => {
                res.send("erro" + erro);
            })

    }

    updateSecretary(req, res) {
        Secretary.update(
            {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                permissionID: req.body.permissionID
            },
            { where: { 'id': req.params.id } }
        ).then((secretary) => {
            res.redirect("/secretary");
        }).catch((erro) => {
            res.send("erro" + erro);
        })
    }

}

module.exports = SecretaryController;