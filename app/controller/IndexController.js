const Patient = require('../model/Patient');
const User = require('../model/User');
const hash = require('../common/generateHash');
const Secretary = require('../model/Secretary');
const Master = require('../model/Master');
const Trainee = require('../model/Trainee');
const Consultation = require('../model/Consultations');
const Wait = require('../model/Wait');
const validate = require('../common/validateFields');
const moment = require('moment');


class IndexController {

    index(req, res) {
        res.render("index/login")
    }

    async dashboard(req, res) {
        const patients = await Patient.searchAllPatients();
        const waitPatients = await Wait.searchWaitPatients();
        const trainees = await Trainee.searchAllTrainees();

        if (req.user.NivelPermissaoId == 1) {
            const masterProfile = await Master.searchProfileMaster(req);
            Consultation.searchAllConsults().then((consultation) => {
                res.render('index/dashboard', { waitPatients: waitPatients, masterProfile: masterProfile, consultation: consultation, patients: patients, trainees: trainees });
            }).catch((err) => {
                res.send('erro' + err)
            })

        } else if (req.user.NivelPermissaoId == 2) {
            const secretaryProfile = await Secretary.searchProfileSecretary(req);

            Consultation.searchAllConsults().then((consultation) => {
                res.render('index/dashboard', { waitPatients: waitPatients, secretaryProfile: secretaryProfile, consultation: consultation, patients: patients, trainees: trainees });

            }).catch((err) => {
                res.send('erro' + err)
            })
        } else if (req.user.NivelPermissaoId == 3) {
            const traineeProfile = await Trainee.searchProfileTrainee(req);
            await Consultation.searchConsultsTrainees(traineeProfile.id).then((consultation) => {
                res.render('index/dashboard', { traineeProfile: traineeProfile, consultation: consultation, patients: patients, trainees: trainees });
            }).catch((err) => {
                res.send('erro' + err)
            })

        } else if (req.user.NivelPermissaoId == 4) {
            const patientProfile = await Patient.searchProfilePatient(req);

            Consultation.searchConsultsPatients(patientProfile.id).then((consultation) => {
                res.render('index/dashboard', { patientProfile: patientProfile, consultation: consultation, patients: patients, trainees: trainees });
            }).catch((err) => {
                res.send('erro' + err)
            })


        }
    }

    async onlySchedules(req, res) {
        const patients = await Patient.searchAllPatients();
        const waitPatients = await Wait.searchWaitPatients();
        const trainees = await Trainee.searchAllTrainees();
            const masterProfile = await Master.searchProfileMaster(req);
            Consultation.searchOnlySchedules().then((consultation) => {
                res.render('index/dashboard', { waitPatients: waitPatients, masterProfile: masterProfile, consultation: consultation, patients: patients, trainees: trainees });
            }).catch((err) => {
                res.send('erro' + err);
            });
    }
    async findConsultWeek(req, res) {
        if (req.user.NivelPermissaoId == 1 || req.user.NivelPermissaoId == 2) {
            await Consultation.searchConsultsWeek().then((consult) => {
                res.send(consult)
            }).catch((err) => {
                res.send('erro' + err)
            })
        } else if (req.user.NivelPermissaoId == 3) {
            const traineeProfile = await Trainee.searchProfileTrainee(req);
            await Consultation.searchConsultWeekTrainee(traineeProfile.id).then((consult) => {
                res.send(consult)
            }).catch((err) => {
                res.send('erro' + err)
            })

        } else if (req.user.NivelPermissaoId == 4) {
            const patientProfile = await Patient.searchProfilePatient(req);
            await Consultation.searchConsultWeekPatient(patientProfile.id).then((consult) => {
                res.send(consult)
            }).catch((err) => {
                res.send('erro' + err)
            })
        }
    }

    async findConsultDay(req, res) {
        var startDay = moment.utc();
        startDay.set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
        var endDay = moment.utc();
        endDay.set({ hour: 23, minute: 59, second: 59, millisecond: 59 })

        if (req.user.NivelPermissaoId == 1 || req.user.NivelPermissaoId == 2) {
            Consultation.searchConsultDay(startDay, endDay).then((consult) => {
                res.send(consult)
            }).catch((err) => {
                res.send('erro' + err)
            })
        } else if (req.user.NivelPermissaoId == 3) {
            const traineeProfile = await Trainee.searchProfileTrainee(req);
            Consultation.searchConsultDayTrainee(startDay, endDay, traineeProfile.id).then((consult) => {
                res.send(consult)
            }).catch((err) => {
                res.send('erro' + err)
            })

        } else if (req.user.NivelPermissaoId == 4) {
            const patientProfile = await Patient.searchProfilePatient(req);
            Consultation.searchConsultDayPatient(startDay, endDay, patientProfile.id).then((consult) => {
                res.send(consult)
            }).catch((err) => {
                res.send('erro' + err)
            })
        }
    }
    signup(req, res) {
        res.render('index/register', { erros: {} })
    }

    notfound(req, res) {
        res.render('partials/404')
    }

    async signup_save(req, res) {
        const { email, name, phone, password } = req.body;
        //Criptografa a Senha
        var secretPassword = hash.generateHash(password);
        //Verificar Email Existente
        const emailUser = await User.verifyEmail(email)
        //Validar os campos
        const erros = validate.validateFields(emailUser, email, name, password);
        if (erros) {
            res.render('index/register', { erros: erros })
        } else {
            //Paciente se cadastrando pelo site
            Patient.insertPatientRegister(email, secretPassword, name, phone).then(() => {
                res.redirect('/')
            }).catch((err) => {
                res.send(err);
            });
        }
    }
}


module.exports = IndexController;