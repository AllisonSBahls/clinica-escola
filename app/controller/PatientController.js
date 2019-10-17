const Patient = require('../model/Patient');
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const Master = require('../model/Master');
const Secretary = require('../model/Secretary');
const secretaryrProfile = await Secretary.searchProfileSecretary(req);
const masterProfile = await Master.searchProfileMaster(req);


class SecretaryController {

    async form_admin_patient(req, res) {
        console.log(masterProfile);
        res.render("forms/form_register_patient",  {masterProfile:masterProfile, secretaryrProfile:secretaryrProfile})
    }

    async registerPatient(req, res) {

        const { email, name, phone, dateBirth, gender, password } = req.body;
        //Verificar Email Existente
        var secretPassword = hash.generateHash(password);
        //Verificar Email Existente
        const emailUser = await User.verifyEmail(email)
        //Validar os campos
        const erros = validate.validateFields(emailUser, email, name, password);
        if (erros) {
            res.render('forms/form_register_patient', { erros: erros, masterProfile:masterProfile })
        } else {
            //Registrar informações pessoais do paciente
            Patient.insertPatient(email, secretPassword, name, phone, dateBirth, gender);
        }
    }

    async patients(req, res) {
        Patient.searchAllPatientsUsers().then(function (patients) {
            res.render("pages/patient", { patients: patients, masterProfile:masterProfile, secretaryrProfile:secretaryrProfile})
        }).catch(function (err){
            console.log('erro')
            res.redirect('partials/404');
        })
    }

    deletePatient(req, res) {
        Patient.deletePatient(req.params.id).then(function () {
            req.flash("success_msg", "Paciente deletado com sucesso");
            res.redirect('/paciente');
        }).catch(function (erro) {
            req.flash("error_msg", "Ocorreu um erro ao deletar o paciente");
            res.send("erro" + erro);
        })
    }

    profilePatient(req, res) {
        Patient.findAll({
            where: { 'id': req.params.id },
            include: [{
                model: User, as: 'userPatient',
            },]
        }).then((patient) => {
            res.render("forms/form_profile_patient", { patient: patient });

        }).catch((erro) => {
            res.send("erro" + erro);
        })
    }


    updatePatient(req, res) {
        const { email, name, phone, dateBirth, gender } = req.body;

        Patient.update({
            name,
            phone,
            dateBirth,
            gender
        }, { where: { 'id': req.params.id } }
        ).then(function () {
            req.flash("success_msg", "Paciente alterado com sucesso");
            res.redirect('/paciente');
        }).catch(function (erro) {
            req.flash("error_msg", "Ocorreu um erro ao alterar o paciente");
            res.send("erro" + erro);
        })
    }
}


module.exports = SecretaryController;