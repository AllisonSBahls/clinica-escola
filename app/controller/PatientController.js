const Patient = require('../model/Patient');
const Permission = require('../model/Permissoes');
const bcrypt = require("bcryptjs");
const User = require('../model/User');

class PatientController {

    form_admin_patient(req, res) {
        Permission.findAll()
            .then(function (permissoes) {
                res.render("forms/form_register_patient", { error: {}, permissoes: permissoes })
            });
    }

    async patient_register(req, res) {

        var error = []
        if (!req.body.name || typeof req.body.name == undefined || req.body.name == null) {
            error.push({ text: "Nome Inválido" })
        }
        if (error.length > 0) {
            Permission.findAll()
                .then(function (permissoes) {
                    res.render("forms/form_register_patient", { error: error, permissoes: permissoes })
                });

        } else {

            var generateHash = function (password) {
                return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
            };
            var masterPassword = generateHash(req.body.password);
    
            //Registrar o usuario do paciente
            const permission = 4;
            const { email } = req.body;
            const user = await User.create({ email, masterPassword, permission });
            
            //Registrar um novo usuário
            Patient.create({
                name: req.body.name,
                phone: req.body.phone,
                dateBirth: req.body.dateBirth,
                gender: req.body.gender,
                userPatient: user.id
            }).then(function () {
                req.flash("sucess_msg", "Paciente Registrado com sucesso");
                res.redirect('/paciente');
            }).catch(function (erro) {
                res.send("erro" + erro);
            })

        }

    }

    patients(req, res) {
        Patient.findAll({
            include: [{
                model: User, as: 'userPatient'
            }]
        }).then(function (patients) { // a variavel dentro de permissoes recebera todas as informações da patient
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
                model: USer, as: 'userPatient',
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
                phone: req.body.phone,
                dateBirth: req.body.dateBirth,
                gender: req.body.gender,
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