const Consultation = require('../model/Consultations');
const Secretary = require('../model/Secretary');
const Trainee = require('../model/Trainee');
const Master = require('../model/Master');
const Patient = require('../model/Patient');
const Procedure = require('../model/Procedure');
const Wait = require('../model/Wait');
const dateFormat = require('../common/dateFormat')
const moment = require('moment');
class ConsultationController {

    async consultations(req, res) {

        //Carrega informações do paciente, lista de espera e estagiários e procedimentos.
        const patients = await Patient.searchAllPatients();
        const waitPatients = await Wait.searchWaitPatients();
        const trainees = await Trainee.searchAllTrainees();
        const procedure = await Procedure.searchAllProcedures();

        //Acesso a condição, caso o usuário seja administrador.
        if (req.user.NivelPermissaoId == 1) {
            const masterProfile = await Master.searchProfileMaster(req);
            //Retornar todas as consultas como agendamento ou consulta marcada
            Consultation.searchAllConsults().then((consultation) => {
                res.render('partials/calendar', {procedure:procedure, waitPatients: waitPatients, masterProfile: masterProfile, consultation: consultation, patients: patients, trainees: trainees });
            }).catch((err) => {
                res.send('erro' + err);
            });
            
        //Acesso a condição, caso o usuário seja administrador.
        } else if (req.user.NivelPermissaoId == 2) {
            //Busca o nome do usuário SECRETARIA
            const secretaryProfile = await Secretary.searchProfileSecretary(req);
            //Retornar todas as consultas como agendamento ou consulta marcada
            Consultation.searchAllConsults().then((consultation) => {
                res.render('partials/calendar', {procedure:procedure, waitPatients: waitPatients, secretaryProfile: secretaryProfile, consultation: consultation, patients: patients, trainees: trainees });
            }).catch((err) => {
                res.send('erro' + err);
            });
        } else if (req.user.NivelPermissaoId == 3) {
            //Busca o nome do usuário Estagiário
            const traineeProfile = await Trainee.searchProfileTrainee(req);
            // Retornar apenas as consultas do estagiário
            Consultation.searchConsultsTrainees(traineeProfile.id).then((consultation) => {
                res.render('partials/calendar', {procedure:procedure, traineeProfile: traineeProfile, consultation: consultation, patients: patients, trainees: trainees });
            }).catch((err) => {
                res.send('erro' + err);
            });
        } else if (req.user.NivelPermissaoId == 4) {
            //Busca o nome do usuário Pacientes
            const patientProfile = await Patient.searchProfilePatient(req);

            // RETORNAR AS CONSULTAS DO PACIENTE
            Consultation.searchConsultsPatients(patientProfile.id).then((consultation) => {
                res.render('partials/calendar', {procedure:procedure, patientProfile: patientProfile, consultation: consultation, patients: patients, trainees: trainees });
            }).catch((err) => {
                res.send('erro' + err);
            });
        }
    }

    async listConsults(req, res) {
        //Carrega informação do paciente, lista de espera e estagiários

        const patients = await Patient.searchAllPatients();
        const waitPatients = await Wait.searchWaitPatients();
        const trainees = await Trainee.searchAllTrainees();
        const procedure = await Procedure.searchAllProcedures();

        //Usuário Administrador
        if (req.user.NivelPermissaoId == 1) {
            //Busca o nome do usuário ADMINISTRADOR
            const masterProfile = await Master.searchProfileMaster(req);
            //Retornar todas as consultas como agendamento ou consulta marcada
            Consultation.searchAllConsults().then((consultation) => {
                res.render('pages/consult', {procedure:procedure, waitPatients: waitPatients, masterProfile: masterProfile, consultation: consultation, patients: patients, trainees: trainees });
            }).catch((err) => {
                res.send('erro' + err);
            });
            //Usuário Secretaria
        } else if (req.user.NivelPermissaoId == 2) {
            //Busca o nome do usuário SECRETARIA
            const secretaryProfile = await Secretary.searchProfileSecretary(req);
            //Retornar todas as consultas como agendamento ou consulta marcada
            Consultation.searchAllConsults().then((consultation) => {
                res.render('pages/consult', {procedure:procedure, waitPatients: waitPatients, secretaryProfile: secretaryProfile, consultation: consultation, patients: patients, trainees: trainees });
            }).catch((err) => {
                res.send('erro' + err);
            });
        } else if (req.user.NivelPermissaoId == 3) {
            //Busca o nome do usuário Estagiário
            const traineeProfile = await Trainee.searchProfileTrainee(req);
            // Retornar apenas as consultas do estagiário
            Consultation.searchConsultsTrainees(traineeProfile.id).then((consultation) => {
                res.render('pages/consult', {procedure:procedure, traineeProfile: traineeProfile, consultation: consultation, patients: patients, trainees: trainees });
            }).catch((err) => {
                res.send('erro' + err);
            });
        } else if (req.user.NivelPermissaoId == 4) {
            //Busca o nome do usuário Pacientes
            const patientProfile = await Patient.searchProfilePatient(req);

            // RETORNAR AS CONSULTAS DO PACIENTE
            Consultation.searchConsultsPatients(patientProfile.id).then((consultation) => {
                res.render('pages/consult', {procedure:procedure,  patientProfile: patientProfile, consultation: consultation, patients: patients, trainees: trainees });
            }).catch((err) => {
                res.send('erro' + err);
            });
        }
    }

    async onlySchedules(req, res) {
        //Carrega informação do paciente, lista de espera e estagiários
        const patients = await Patient.searchAllPatients();
        const waitPatients = await Wait.searchWaitPatients();
        const trainees = await Trainee.searchAllTrainees();

        //Usuário Administrador
            //Busca o nome do usuário ADMINISTRADOR
            const masterProfile = await Master.searchProfileMaster(req);
            //Retornar todas as consultas como agendamento ou consulta marcada
            Consultation.searchOnlySchedules().then((consultation) => {
                res.render('partials/calendar', { waitPatients: waitPatients, masterProfile: masterProfile, consultation: consultation, patients: patients, trainees: trainees });
            }).catch((err) => {
                res.send('erro' + err);
            });
            //Usuário Secretaria
    }

    async saveConsult(req, res) {
        const { dateStart, timeStart, description, patientId, traineeId, typeSchedule, patientWaitId,typeProcedure } = req.body;
        //converter formato brasileiro para SQL
        const date = dateStart +' '+ timeStart
        const datetime = dateFormat(date);
        let idMaster;
        let idSecretary;

        //Verifica se o tipo do agendamento é 1 - Consulta ou 2 - Agendamento e também verifica se o usuário é administrador ou secretaria
        if (typeSchedule == 1 && req.user.NivelPermissaoId == 1 || req.user.NivelPermissaoId == 2) {
            if (req.user.NivelPermissaoId == 1){
                const masterProfile = await Master.searchProfileMaster(req);
                idMaster = masterProfile.id
                idSecretary = null;
            }else{
                const secretaryProfile = await Secretary.searchProfileSecretary(req);
                idSecretary = secretaryProfile.id
                idMaster = null;
            }
            //Caso seja consulta a cor é Azul
            const color = '#2B56E2';
            
            //Verificar se o usuário esta pegando um paciente para lista de pacientes ou da lista de espera
            if (patientId != 0) {
                Consultation.insertConsults(datetime, idSecretary, patientId, traineeId, idMaster, typeSchedule, color, description, typeProcedure).then(function () {
                    req.flash("success_msg", "Consulta marcada com sucesso");
                    res.redirect('/dashboard');
                }).catch(function (err) {
                    req.flash("error_msg", "Erro ao marcar a consulta");
                    res.redirect('/dashboard');
                })
            } else {
                Wait.searchUpdateWait(patientWaitId)
                Consultation.insertConsults(datetime, idSecretary, patientWaitId, traineeId, idMaster, typeSchedule, color, description, typeProcedure).then(function () {
                    req.flash("success_msg", "Consulta marcada com sucesso");
                    res.redirect('/dashboard');
                }).catch(function (err) {
                    req.flash("error_msg", "Erro ao marcar a consulta");
                    res.redirect('/dashboard');
                })
            }
            //Verifica se o tipo do agendamento é 1 - Consulta ou 2 - Agendamento e também verifica se o usuário é administrador ou secretaria
        } else if (typeSchedule == 2 && req.user.NivelPermissaoId == 1 || req.user.NivelPermissaoId == 2) {
            //Caso seja agendamento a cor é Verde
            const color = '#1FA576';
            if (patientId != null) {
                Consultation.insertSchedules(datetime, patientId, color).then(function () {
                    req.flash("success_msg", "Agendamento marcada com sucesso");
                    res.redirect('/dashboard');
                }).catch(function (err) {
                    req.flash("error_msg", "Erro ao marcar a Agendamento");
                    res.redirect('/dashboard');
                })
            } else {
                Consultation.insertSchedules(datetime, patientWaitId, color).then(function () {
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
            if(datetime <= moment.utc().add(2, 'days').format('YYYY-MM-DD HH:MM:SS')){
                req.flash("error_msg", "A data de Agendamento deve ser no minimo de 2 dias de diferença");
                res.redirect('/dashboard');
            } else {
                const color = '#1FA576';
                const patientProfile = await Patient.searchProfilePatient(req);
                Consultation.insertSchedules(datetime, patientProfile.id, color).then(function () {
                    req.flash("success_msg", "Agendamento marcado com sucesso");
                    res.redirect('/dashboard');
                }).catch(function (err) {
                    req.flash("error_msg","Erro ao marcar o agendamento");
                    res.redirect('/dashboard');
                })
            }
        }
    }

    deleteSchedules(req, res) {
        if (req.user.NivelPermissaoId == 1 || req.user.NivelPermissaoId == 2){
            Consultation.deleteSchedules(req.body.consultationId).then(() => {
                req.flash("success_msg", "Agendamento Cancelado com Sucesso")
                res.redirect('/dashboard')
            }).catch((err) => {
                req.flash("error_msg","Erro ao deletar o agendamento");
                res.redirect('/dashboard');
            })
        }else{
            req.flash("error_msg", "Você não tem autorização para excluir")
            res.redirect('/dashboard')
        }
    }

    async cancelamentoSchedule(req, res) {
        if (req.user.NivelPermissaoId == 1 || req.user.NivelPermissaoId == 2){
            Consultation.cancelConsultation(req.body.cancelId).then(() => {
                req.flash("success_msg", "Consulta cancelado com scesso")
                res.redirect('/dashboard')
            }).catch((err) => {
                req.flash("error_msg","Erro ao cancelar a consulta");
                res.redirect('/dashboard')
            })
        }else{
            req.flash("error_msg", "Você não tem autorização")
            res.redirect('/dashboard')
        }
    }

    confirmSchedules(req, res){
        if (req.user.NivelPermissaoId == 1 || req.user.NivelPermissaoId == 2){
            const {dateStart, consultationId, traineeId, description} = req.body;
            const datetime = dateFormat(dateStart);
            Consultation.confirmSchedule(datetime, consultationId, traineeId, description).then((result) => {
                req.flash("success_msg", "Consulta confirmada com ssucesso")
                res.redirect('/dashboard')
            }).catch((err) => {
                req.flash("error_msg", "Você ao confirmar a consulta")
                res.redirect('/dashboard')
                
            });
        }else{
            req.flash("error_msg", "Você não tem autorização")
            res.redirect('/dashboard')
        }
    }

    
}

module.exports = ConsultationController;

