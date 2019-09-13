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
            res.render("pages/patient", { patients: patients})
        }).catch(function (err){
            console.log('erro')
            res.redirect('partials/404');
        })
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