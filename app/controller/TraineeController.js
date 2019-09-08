const Trainee = require('../model/Trainee');
const Permission = require('../model/Permissoes');

class TraineeController {

    form_admin_trainee(req, res) {
        Permission.findAll()
            .then(function (permissoes) {
                res.render("forms/form_register_trainee", { permissoes: permissoes })
            });
    }

    trainee_register(req, res) {
        Trainee.create({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password,
            course: req.body.course,
            period: req.body.period,
            permissionID: req.body.permissionID

        }).then(function () {
            res.redirect('/estagiario');
        }).catch(function (erro) {
            res.send("erro" + erro);
        })
    }

    trainees(req, res) {
        Trainee.findAll()
            .then(function (trainees) { // a variavel dentro de permissoes recebera todas as informações da trainee
                res.render("pages/trainee", { trainees: trainees })
            });
    }

    deleteTrainee(req, res) {
        Trainee.destroy({
            where: { 'id': req.params.id }
        }).then(function () {
            res.redirect('/estagiario');
        }).catch(function (erro) {
            res.send("erro" + erro);
        })
    }

    profileTrainee(req, res) {
        Permission.findAll().
            then((permissoes) => {
                Trainee.findAll({
                    where: { 'id': req.params.id }
                }).then((trainee) => {
                    res.render("forms/form_profile_trainee", { trainee: trainee, permissoes: permissoes });

                })
            }).catch((erro) => {
                res.send("erro" + erro);
            })

    }

    updateTrainee(req, res) {
        Trainee.update(
            {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                course: req.body.course,
                period: req.body.period,
                permissionID: req.body.permissionID
            },
            { where: { 'id': req.params.id } }
        ).then((trainee) => {
            res.redirect("/estagiario");
        }).catch((erro) => {
            res.send("erro" + erro);
        })
    }

}

module.exports = TraineeController;