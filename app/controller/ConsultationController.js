const Consultation = require('../model/Consultations');
const Secretary = require('../model/Secretary');
const Trainee = require('../model/Trainee');
const Master = require('../model/Master');
const Patient = require('../model/Patient');
const Wait = require('../model/Wait');
const dateFormat = require('../common/dateFormat')

class ConsultationController {

    async consultations(req, res) {
        //Carrega informação do paciente, lista de espera e estagiários
        const patients = await Patient.searchAllPatients();
        const waitPatients = await Wait.searchWaitPatients();
        const trainees = await Trainee.searchAllTrainees();

        //Usuário Administrador
        if (req.user.NivelPermissaoId == 1) {
            //Busca o nome do usuário ADMINISTRADOR
            const masterProfile = await Master.searchProfileMaster(req, res);

            //Retornar todas as consultas como agendamento ou consulta marcada
            Consultation.searchAllConsults().then((consultation) => {
                res.render('partials/calendar', { waitPatients: waitPatients, masterProfile: masterProfile, consultation: consultation, patients: patients, trainees: trainees });
            }).catch((err) => {
                res.send('erro' + err);
            });

            //Usuário Secretaria
        } else if (req.user.NivelPermissaoId == 2) {
            //Busca o nome do usuário SECRETARIA
            const secretaryProfile = await Secretary.searchProfileSecretary();
            //Retornar todas as consultas como agendamento ou consulta marcada
            Consultation.searchAllConsults().then((consultation) => {
                res.render('partials/calendar', { waitPatients: waitPatients, secretaryProfile: secretaryProfile, consultation: consultation, patients: patients, trainees: trainees });
            }).catch((err) => {
                res.send('erro' + err);
            });

        } else if (req.user.NivelPermissaoId == 3) {
            //Busca o nome do usuário Estagiário
            const traineeProfile = await Trainee.searchProfileTrainee();

            // Retornar apenas as consultas do estagiário
            await Consultation.searchConsultsTrainees(traineeProfile.id).then((consultation) => {
                res.render('partials/calendar', { traineeProfile: traineeProfile, consultation: consultation, patients: patients, trainees: trainees });
            }).catch((err) => {
                res.send('erro' + err);
            });

        } else if (req.user.NivelPermissaoId == 4) {
            //Busca o nome do usuário Pacientes
            const patientProfile = await Patient.searchProfilePatient(req);

            // RETORNAR AS CONSULTAS DO PACIENTE
            Consultation.searchConsultsPatients(patientProfile.id).then((consultation) => {
                res.render('partials/calendar', { patientProfile: patientProfile, consultation: consultation, patients: patients, trainees: trainees });
            }).catch((err) => {
                res.send('erro' + err);
            });
        }
    }

    async consult_save(req, res) {
        const { dateStart, patientId, traineeId, typeSchedule, patientWaitId } = req.body;

        //converter formato brasileiro para SQL
        const datetime = dateFormat(dateStart);
        //Verifica se o tipo do agendamento é 1 - Consulta ou 2 - Agendamento e também verifica se o usuário é administrador ou secretaria
        if (typeSchedule == 1 && req.user.NivelPermissaoId == 1 || req.user.NivelPermissaoId == 2) {
            //Caso seja consulta a cor é Azul
            const color = '#2B56E2';
            //Verificar se o usuário esta pegando um paciente para lista de pacientes ou da lista de espera
            if (patientId != 0) {
                Consultation.insertConsults(datetime, patientId, traineeId, typeSchedule, color).then(function () {
                    req.flash("success_msg", "Consulta marcada com sucesso");
                    res.redirect('/dashboard');
                }).catch(function (err) {
                    req.flash("error_msg", "Erro ao marcar a consulta");
                    res.redirect('/dashboard');
                })

            } else {
                Wait.searchUpdateWait(patientWaitId)
                Consultation.insertConsults(datetime, patientWaitId, traineeId, typeSchedule, color).then(function () {
                    req.flash("success_msg", "Consulta marcada com sucesso");
                    res.redirect('/dashboard');
                }).catch(function (err) {
                    req.send("error_msg", "Erro ao marcar a consulta", err);
                    res.redirect('/dashboard');
                })
            }

            //Verifica se o tipo do agendamento é 1 - Consulta ou 2 - Agendamento e também verifica se o usuário é administrador ou secretaria
        } else if (typeSchedule == 2 && req.user.NivelPermissaoId == 1 || req.user.NivelPermissaoId == 2) {
            //Caso seja agendamento a cor é Verde
            const color = '#1FA576';
            if (patientId != null) {
                Consultation.insertSchedules(datetime, patientId, color, typeSchedule).then(function () {
                    req.flash("success_msg", "Agendamento marcada com sucesso");
                    res.redirect('/dashboard');
                }).catch(function (err) {
                    req.flash("error_msg", "Erro ao marcar a Agendamento");
                    res.redirect('/dashboard');
                })
            } else {
                Consultation.insertSchedules(datetime, patientWaitId, color, typeSchedule).then(function () {
                    Wait.searchUpdateWait(patientWaitId)
                    req.flash("success_msg", "Consulta marcada com sucesso");
                    res.redirect('/dashboard');
                }).catch(function (err) {
                    req.flash("error_msg", "Erro ao marcar a consulta");
                    res.redirect('/dashboard');
                })
            }
            //O paciente podera solicitar uma consulta
        } else {
            const color = '#1FA576';
            const patientProfile = await Patient.searchProfilePatient(req);
            Consultation.insertSchedules(datetime, patientProfile.id, color, typeSchedule).then(function () {
                req.flash("success_msg", "Agendamento marcado com sucesso");
                res.redirect('/dashboard');
            }).catch(function (err) {
                req.send("Erro ao marcar o agendamento",err);
                res.redirect('/dashboard');

            })
        }
    }

    deleteSchedules(req, res) {
        Consultation.deleteSchedules(req.body.consultationId).then(() => {
            req.flash("success_msg", "Agendamento Cancelado com Sucesso")
            res.redirect('/dashboard')
        }).catch((err) => {
            res.send("Não é possivel cancelar o agendamento" + err)
        })

    }

    async cancelamentoSchedule(req, res) {
        Consultation.cancelConsultation(req.body.cancelId).then(() => {
            req.flash("success_msg", "Consulta Cancelado com Sucesso")
            res.redirect('/calendar')
        }).catch((err) => {
            res.send("Não é possivel cancelar o agendamento" + err)
        })
    }
}

module.exports = ConsultationController;

