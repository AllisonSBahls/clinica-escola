const Patient = require('../model/Patient');
const User = require('../model/User');
const bcrypt = require('bcryptjs');

class SecretaryController {

    form_admin_patient(req, res) {

        res.render("forms/form_register_patient")

    }

    async patient_register(req, res) {
        //Criptografa a Senha
        var generateHash = function (password) {
            return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
        };
        var secretaryPassword = generateHash(req.body.password);

        const { email, name, phone, dateBirth, gender } = req.body;
        //Verificar Email Existente
        const emailUser = await User.findAll({
            where: { email: email }
        })

        if (emailUser.length > 0) {
            console.log('email já existe')
            res.redirect('/paciente')
        } else {
            //Registrar o usuario do supervisor
            const user = await User.create({
                email: email,
                password: secretaryPassword,
                NivelPermissaoId: 4
            });

            //Registrar informações pessoais do supervisor
            Patient.create({
                name,
                phone,
                dateBirth,
                gender,
                userPatientId: user.id
            }).then(function () {
                res.redirect('/paciente');
            })
        }
    }

    patients(req, res) {
        Patient.findAll({
            include: [{
                model: User, as: 'userPatient'
            }]
        }).then(function (patients) {
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
            res.redirect('/paciente');
        }).catch(function (erro) {
            res.send("erro" + erro);
        })
    }
}


module.exports = SecretaryController;