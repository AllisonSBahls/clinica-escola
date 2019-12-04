const User = require('../model/User');
const bcrypt = require('../common/generateHash');
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

    async passwordUpdate(req, res) {
        const {passwordCurrent, passwordNew, passwordConfirm } = req.body;
        const passwordUser = await User.searchPasswordUser(req);

        if(!bcrypt.validPassword(passwordCurrent, passwordUser.password)){
            req.flash('error_msg', 'Senha invalida');
            res.redirect('/user/password')
        }else { 
            if (passwordNew  ==  passwordConfirm){
                var secretPassword = bcrypt.generateHash(passwordNew);
                User.updatePassword(secretPassword, req).then(() => {
                    req.flash("success_msg", "Senha alterada com sucesso");
                    res.redirect('/user/password');
                }).catch((err) => {
                    req.flash('error_msg', 'Erro - contate o administrador');
                    res.redirect('/user/password')
                });
            }else{
                req.flash('error_msg', 'As senhas não conferem');
                    res.redirect('/user/password')
            }
        };
    }
    

    async passwordUser(req, res){
        const secretaryProfile = await Secretary.searchProfileSecretary(req);
        const masterProfile = await Master.searchProfileMaster(req);
        const patientProfile = await Patient.searchProfilePatient(req);

        const traineeProfile = await Trainee.searchProfileTraineeUser(req);

        res.render('forms/form_password', {traineeProfile:traineeProfile, patientProfile:patientProfile, masterProfile:masterProfile, secretaryProfile:secretaryProfile})
    }

}

module.exports = UserController;