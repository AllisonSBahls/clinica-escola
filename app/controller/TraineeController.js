const Trainee = require('../model/Trainee');
const User = require('../model/User');
const bcrypt = require('bcryptjs');

class SecretaryController {

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

        if (emailUser.length > 0) {
            console.log('email já existe')
            res.redirect('/estagiario')
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
                res.redirect('/estagiario');
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
            res.redirect('/estagiario');
        }).catch(function (erro) {
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
            res.redirect('/estagiario');
        }).catch(function (erro) {
            res.send("erro" + erro);
        })
    }
}


module.exports = SecretaryController;