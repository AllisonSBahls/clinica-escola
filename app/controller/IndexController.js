const Patient = require('../model/Patient');
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const Secretary = require('../model/Secretary');
const Trainee = require('../model/Trainee');
const Consultation = require('../model/Consultations');
const moment= require( 'moment' );
const { Op } = require('sequelize')


class IndexController {
    index(req, res) {
        res.render("index/login")
    }

    async dashboard(req, res) {
        const patients = await Patient.findAll();
        const trainees = await Trainee.findAll();
        const consult = await Consultation.findAll({
            where: {
                dateStart: {
                    [Op.between]: [moment().day(0).minute(0), moment().day(7).minute(59)]},
                },
            include: [{
                model: Patient, as: 'consultPatient',
            }, {
                model: Trainee, as: 'consultTrainee',
            }, {
                model: Secretary, as: 'consultSecretary',
            }]
        });

        Consultation.findAll({
            include: [{
                model: Patient, as: 'consultPatient',
            }, {
                model: Trainee, as: 'consultTrainee',
            }, {
                model: Secretary, as: 'consultSecretary',
            }]
        }).then((consultation) => {
            res.render('index/dashboard', {consult: consult, consultation: consultation, patients: patients, trainees: trainees });

        }).catch((err) => {
            res.send('erro' + err)
        })

    }



    // consult_day(req, res) {
    //     console.log(req.body.dateConsultStart)
       
    //     // Consultation.findAll({
    //     //     where: { dateStart: datetime },
    //     //     include: [{
    //     //         model: Patient, as: 'consultPatient',
    //     //     }, {
    //     //         model: Trainee, as: 'consultTrainee',
    //     //     }, {
    //     //         model: Secretary, as: 'consultSecretary',
    //     //     }]
    //     // }).then((consult) => {
    //     //     console.log(consult)
    //        //  res.render('index/dashboard');
    //     // }).catch((err) => {
    //     //     res.send('erro' + err)
    //     // })
    // }


    signup(req, res) {
        res.render('index/register')
    }

    notfound(req, res) {
        res.render('partials/404')
    }

    async signup_save(req, res) {
        //Criptografa a Senha
        var generateHash = function (password) {
            return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
        };
        var secretaryPassword = generateHash(req.body.password);

        const { email, name, phone } = req.body;
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
            res.render('index/register', { erros: erros })
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
                userPatientId: user.id
            }).then(function () {
                res.redirect('/');
            }).catch((err) => {
                console.log(err)
            })
        }
    }
}


module.exports = IndexController;