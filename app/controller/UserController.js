const Permission = require('../model/Permissoes');
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const Secretary = require('../model/Secretary');
const Master = require('../model/Master');
const Trainee = require('../model/Trainee');
const Patient = require('../model/Patient');

class UserController {

    profileUser(req, res) {
        User.findAll({
            where: { 'id': req.params.id },
        }).then((users) => {
            consonle.log(users)
            res.render("forms/form_profile_user", { users: users });

        }).catch((erro) => {
            res.send("erro" + erro);
        })
    }

    myProfile(req, res) {
        if (req.user.NivelPermissaoId == 1) {
            Master.findOne({
                where: { userMasterId: req.user.id },
                include: [{
                    model: User, as: 'userMaster'
                }]
            }).then((masterProfile) => {
                res.render("forms/form_profile", { masterProfile: masterProfile });
            }).catch((erro) => {
                res.send("erro" + erro);
            })

        } else if (req.user.NivelPermissaoId == 2) {
            Secretary.findOne({
                where: { userSecretaryId: req.user.id },
                include: [{
                    model: User, as: 'userSecretary'
                }]
            }).then((secretaryProfile) => {
                res.render("forms/form_profile", { secretaryProfile: secretaryProfile });
            }).catch((erro) => {
                res.send("erro" + erro);
            })

        } else if (req.user.NivelPermissaoId == 3) {
            Trainee.findOne({
                where: { userTraineeId: req.user.id },
                include: [{
                    model: User, as: 'userTrainee'
                }]
            }).then((traineeProfile) => {
                res.render("forms/form_profile", { traineeProfile: traineeProfile });
            }).catch((erro) => {
                res.send("erro" + erro);
            })

        } else if (req.user.NivelPermissaoId == 4) {
            Patient.findOne({
                where: { userPatientId: req.user.id },
                include: [{
                    model: User, as: 'userPatient'
                }]
            }).then((patientProfile) => {
                res.render("forms/form_profile", { patientProfile: patientProfile });
            }).catch((erro) => {
                res.send("erro" + erro);
            })
        }
    }

    async updateUser(req, res) {
        const { email, password } = req.body;
        //Verificar Email Existente
        const emailUser = await User.findAll({
            where: { email: email }
        })

        var generateHash = function (password) {
            return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
        };
        var masterPassword = generateHash(password);

        if (emailUser && emailUser.length > 0) {
            req.flash('error_msg', 'Email já existe');
            res.redirect('/supervisor')
        } else {
            User.update({
                email,
                password: masterPassword
            }, {
                where: { id: req.params.id }
            }).then(() => {
                res.redirect('/');
                req.flash("success_msg", "Informações de Usuário alteradas com sucesso");
            }).catch((err) => {
                req.flash('error_msg', 'Houve um erro ao salvar o supervisor');
                res.redirect('/')
            });
        }
    }


}

module.exports = UserController;