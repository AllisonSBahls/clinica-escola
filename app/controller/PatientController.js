const Patient = require('../model/Patient');
const Permission = require('../model/Permissoes');
const bcrypt = require("bcryptjs");

class PatientController {

    form_admin_patient(req, res) {
            Permission.findAll()
                .then(function (permissoes) {
                    res.render("forms/form_register_patient", {error: {}, permissoes: permissoes })
                });
}

    patient_register(req, res) {

        var error = []
        if (!req.body.name || typeof req.body.name == undefined || req.body.name == null) {
            error.push({ text: "Nome Inválido" })
        }
        if (error.length > 0) {
            Permission.findAll()
                .then(function (permissoes) {
                    res.render("forms/form_register_patient", {error: error, permissoes: permissoes })
                });

        } else {
            Patient.create({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                dateBirth: req.body.dateBirth,
                gender: req.body.gender,
                password: req.body.password,
                NivelPermissaoId: req.body.NivelPermissaoId
            }).then(function () {
                req.flash("sucess_msg", "Paciente Registrado com sucesso");
                res.redirect('/paciente');
            }).catch(function (erro) {
                res.send("erro" + erro);
            })
        }
    }

    patients(req, res) {
        Patient.findAll()
            .then(function (patients) { // a variavel dentro de permissoes recebera todas as informações da patient
                res.render("pages/patient", { patients: patients })
            });
    }

    deletePatient(req, res) {
        Patient.destroy({
            where: { 'id': req.params.id }
        }).then(function () {
            res.redirect('/paciente');
        }).catch(function (erro) {
            res.send("erro" + erro);
        })
    }

    profilePatient(req, res) {

        Patient.findAll({
            where: { 'id': req.params.id },
            include: [{
                model: Permission, as: 'NivelPermissao',
            }],

        }).then((patient) => {
            res.render("forms/form_profile_patient", { patient: patient });


        }).catch((erro) => {
            res.send("erro" + erro);
        })

    }

    updatePatient(req, res) {
        Patient.update(
            {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                dateBirth: req.body.dateBirth,
                gender: req.body.gender,
                password: req.body.password,
                fk_permissao_paciente: req.body.NivelPermissaoId
            },
            { where: { 'id': req.params.id } }
        ).then((patient) => {
            res.redirect("/paciente");
        }).catch((erro) => {
            res.send("erro" + erro);
        })
    }

}

module.exports = PatientController;