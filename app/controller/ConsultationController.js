const Consultation = require('../model/Consultations');
const Secretary = require('../model/Secretary');
const Trainee = require('../model/Trainee');
const Master = require('../model/Master');
const Patient = require('../model/Patient');
const Wait = require('../model/Wait');
const moment = require('moment');
const controllerModel = require('../helpers/Consultations')

class ConsultationController {

    async consultations(req, res) {
        const patients = await Patient.findAll();

        const waitPatients = await Wait.findAll({
            where:{dateExit: null},
            include: [{
                model: Patient, as: 'waitPatient',
            }],
         
        });

        const trainees = await Trainee.findAll();
        
        if (req.user.NivelPermissaoId == 1) {
            const masterProfile = await Master.findOne({
                where: { userMasterId: req.user.id }
            });
            //Retornar todas as consultas como agendamento ou consulta marcada
            await controllerModel.consultAll().then((consultation) => {
                res.render('partials/calendar', { waitPatients: waitPatients, masterProfile: masterProfile, consultation: consultation, patients: patients, trainees: trainees });
            }).catch((err) => {
                res.send('erro' + err);
            });

        } else if (req.user.NivelPermissaoId == 2) {
            const secretaryProfile = await Secretary.findOne({
                where: { userSecretaryId: req.user.id }
            });
            //Retornar todas as consultas como agendamento ou consulta marcada
            await controllerModel.consultAll().then((consultation) => {
                res.render('partials/calendar', { secretaryProfile: secretaryProfile, consultation: consultation, patients: patients, trainees: trainees });
            }).catch((err) => {
                res.send('erro' + err);
            });

        } else if (req.user.NivelPermissaoId == 3) {
            const traineeProfile = await Trainee.findOne({
                where: { userTraineeId: req.user.id }
            });

            // Retornar apenas as consultas do estagiário
            await controllerModel.consultsTrainee(traineeProfile.id).then((consultation) => {
                res.render('partials/calendar', { traineeProfile: traineeProfile, consultation: consultation, patients: patients, trainees: trainees });
            }).catch((err) => {
                res.send('erro' + err);
            });
        } else if (req.user.NivelPermissaoId == 4) {
            const patientProfile = await Patient.findOne({
                where: { userPatientId: req.user.id }
            })

            // RETORNAR AS CONSULTAS DO PACIENTE
            await controllerModel.consultsPatient(patientProfile.id).then((consultation) => {
                    res.render('partials/calendar', { patientProfile: patientProfile, consultation: consultation, patients: patients, trainees: trainees });
                }).catch((err) => {
                    res.send('erro' + err);
                });
        }
    }

    // async consultationsPatients(req, res) {
    //     const patients = await Patient.findAll();
    //     const trainees = await Trainee.findAll();
    //     Consultation.findAll({
    //         where: { consultPatientId: req.user.id },
    //         include: [{
    //             model: Patient, as: 'consultPatient',
    //         }, {
    //             model: Trainee, as: 'consultTrainee',
    //         }, {
    //             model: Secretary, as: 'consultSecretary',
    //         }]
    //     }).then((consultation) => {
    //         res.render('partials/calendar', { consultation: consultation, patients: patients, trainees: trainees });

    //     })
    // }

    async consult_save(req, res) {
        //converter formato brasileiro para SQL
        var newDt = moment(req.body.dateStart, "DD/MM/YYYY HH:mm:ss")
        var datetime = moment(newDt).format('YYYY-MM-DD HH:mm:ss');

        if (req.body.typeSchedule == 1 && req.user.NivelPermissaoId == 1 || req.user.NivelPermissaoId == 2) {
            if (req.body.patientId != null){
            Consultation.create({
                dateStart: datetime,
                consultPatientId: req.body.patientId,
                consultTraineeId: req.body.traineeId,
                color: '#2B56E2',
                typeSchedule: req.body.typeSchedule,
            }).then(function () {
                req.flash("success_msg", "Consulta marcada com sucesso");
                res.redirect('/dashboard');
            }).catch(function (err) {
                req.flash("error_msg", "Erro ao marcar a consulta");
                res.redirect('/dashboard');
            })
        }else {
            const waitId = await Wait.findOne({
                where: {waitPatientId: req.body.patientWaitId},
            })
            await Wait.update({
                dateExit: moment(),
            },{
                where: {id : waitId.id}
            });

            Consultation.create({
                dateStart: datetime,
                consultPatientId: req.body.patientWaitId,
                consultTraineeId: req.body.traineeId,
                color: '#2B56E2',
                typeSchedule: req.body.typeSchedule,
            }).then(function () {
                req.flash("success_msg", "Consulta marcada com sucesso");
                res.redirect('/dashboard');
            }).catch(function (err) {
                req.flash("error_msg", "Erro ao marcar a consulta");
                res.redirect('/dashboard');

            })
        }
        } else if (req.body.typeSchedule == 2 && req.user.NivelPermissaoId == 1 || req.user.NivelPermissaoId == 2) {
            Consultation.create({
                dateStart: datetime,
                consultPatientId: req.body.patientId,
                consultTraineeId: req.body.traineeId,
                typeSchedule: req.body.typeSchedule,
                color: '#1FA576',
            }).then(function () {
                req.flash("success_msg", "Agendamento marcado com sucesso");
                res.redirect('/dashboard');
            }).catch(function (err) {
                req.flash("error_msg", "Erro ao marcar o agendamento");
                res.redirect('/dashboard');

            })
        } else {
            await Patient.findOne({
                where: { userPatientId: req.user.id }
            }).then((patient) => {
                Consultation.create({
                    dateStart: datetime,
                    consultPatientId: patient.id,
                    color: '#1FA576',
                }).then(function () {
                    req.flash("success_msg", "Agendamento marcado com sucesso");
                    res.redirect('/dashboard');
                }).catch(function (err) {
                    req.flash("error_msg", "Erro ao marcar o agendamento");
                    res.redirect('/dashboard');

                })
            })
        }
    }

    async deleteSchedules(req, res) {
        Consultation.destroy({
            where: { id: req.body.consultationId }
        }).then((consult) => {
            req.flash("success_msg", "Agendamento Cancelado com Sucesso")
            res.redirect('/dashboard')
        }).catch((err) => {
            res.send("Não é possivel cancelar o agendamento" + err)
        })

    }

    async cancelamentoSchedule(req, res) {
        Consultation.update({
            typeSchedule: 3,
            color: '#992F2F'
        }, {
            where: {
                id: req.body.cancelId
            },
        }).then((consult) => {
            req.flash("success_msg", "Consulta Cancelado com Sucesso")
            res.redirect('/calendar')
        }).catch((err) => {
            res.send("Não é possivel cancelar o agendamento" + err)
        })
    }
}

module.exports = ConsultationController; 

