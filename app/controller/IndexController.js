const Patient = require('../model/Patient');
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const Secretary = require('../model/Secretary');
const Master = require('../model/Master');
const Trainee = require('../model/Trainee');
const Consultation = require('../model/Consultations');
const Wait = require('../model/Wait');
const controllerModel = require('../helpers/Consultations')

const moment= require( 'moment' );
const { Op } = require('sequelize')


class IndexController {

    index(req, res) {
        res.render("index/login")
    }

    async dashboard(req, res) {
        const patients = await Patient.searchAllPatients();
        const waitPatients = await Wait.searchWaitPatients();
        const trainees = await Trainee.searchAllTrainees();

        const consult = await Consultation.searchConsultsWeek();

    if (req.user.NivelPermissaoId == 1) {
        const masterProfile = await Master.searchProfileMaster(req, res);
            
        Consultation.searchAllConsults().then((consultation) => {
            res.render('index/dashboard', {waitPatients: waitPatients, masterProfile: masterProfile,  consult: consult, consultation: consultation, patients: patients, trainees: trainees });
        }).catch((err) => {
            res.send('erro' + err)
        })

     }else if (req.user.NivelPermissaoId == 2) {
            const secretaryProfile = await Secretary.searchProfileSecretary();
            
            Consultation.searchAllConsults().then((consultation) => {
                res.render('index/dashboard', {secretaryProfile: secretaryProfile, consult: consult, consultation: consultation, patients: patients, trainees: trainees });

            }).catch((err) => {
                res.send('erro' + err)
            })

    }else if(req.user.NivelPermissaoId == 4){
        const patientProfile = await Patient.findOne({
        where: {userPatientId: req.user.id} });

        const consult = await Consultation.searchConsultWeekPatient(patientProfile.id);

        controllerModel.consultsPatient( patientProfile.id, ).then((consultation) => {
            res.render('index/dashboard', {patientProfile: patientProfile, consult: consult, consultation: consultation, patients: patients, trainees: trainees });

        }).catch((err) => {
            res.send('erro' + err)
        })


    }else if(req.user.NivelPermissaoId == 3){
        const traineeProfile = await Trainee.findOne({
            where: {userTraineeId: req.user.id} });

        const consult = await Consultation.findAll({
            where: {
                consultTraineeId: traineeProfile.id
            },
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

        await controllerModel.consultsTrainee(traineeProfile.id).then((consultation) => {
            res.render('index/dashboard', {traineeProfile:traineeProfile, consult: consult, consultation: consultation, patients: patients, trainees: trainees });

        }).catch((err) => {
            res.send('erro' + err)
        })
    }    
} 

    signup(req, res) {
        res.render('index/register', {erros: {}})
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