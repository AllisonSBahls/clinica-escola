const Trainee = require('../model/Trainee');
const User = require('../model/User');
const bcrypt = require('bcryptjs');

class TraineeController {

    form_admin_trainee(req, res) {

        res.render("forms/form_register_trainee")

    }

    async trainee_register(req, res) {
        //Criptografa a Senha
        var generateHash = function (password) {
            return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
        };
        var secretaryPassword = generateHash(req.body.password);

        const { email, name, phone, course, period } = req.body;
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
                NivelPermissaoId: 3
            });

            //Registrar informações pessoais do supervisor
            Trainee.create({
                name,
                phone,
                course,
                period,
                userTraineeId: user.id
            }).then(function () {
                req.flash("success_msg", "Estagiario cadastrada com sucesso");
                res.redirect('/estagiario');
            }).catch(function (erro) {
                req.flash("error_msg", "Ocorreu um erro ao salvar o estagiario");
                res.send("erro" + erro);
        })
    }
}
    trainees(req, res) {
        Trainee.findAll({
            include: [{
                model: User, as: 'userTrainee'
            }]
        }).then(function (trainees) {
            res.render("pages/trainee", { trainees: trainees })
        });
    }

    deleteTrainee(req, res) {
        Trainee.destroy({
            where: { 'id': req.params.id }
        }).then(function () {
            req.flash("success_msg", "Estagiario deletado com sucesso");
                res.redirect('/estagiario');
            }).catch(function (erro) {
                req.flash("error_msg", "Ocorreu um erro ao deletar o estagiario");
                res.send("erro" + erro);
    })
}

    profileTrainee(req, res) {
        Trainee.findAll({
            where: { 'id': req.params.id },
            include: [{
                model: User, as: 'userTrainee',
            },]
        }).then((trainee) => {
            res.render("forms/form_profile_trainee", { trainee: trainee });

        }).catch((erro) => {
            res.send("erro" + erro);
        })
    }


    updateTrainee(req, res) {
        const { email, name, phone, period, course } = req.body;

        Trainee.update({
            name,
            phone,
            period,
            course
        }, { where: { 'id': req.params.id } }
        ).then(function () {
            req.flash("success_msg", "Estagiario alterado com sucesso");
            res.redirect('/estagiario');
        }).catch(function (erro) {
            req.flash("error_msg", "Ocorreu um erro ao alterar o estagiario");
            res.send("erro" + erro);
        })
    }
}


module.exports = TraineeController;