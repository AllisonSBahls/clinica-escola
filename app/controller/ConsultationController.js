const Consultation = require('../model/Consultations');
const Secretary = require('../model/Secretary');
const Trainee = require('../model/Trainee');
const Master = require('../model/Master');
const Patient = require('../model/Patient');
const Procedure = require('../model/Procedure');
const Wait = require('../model/Wait');
const dateFormat = require('../common/dateFormat')
const moment = require('moment');

/**
 * Classe do controlador das consultas
 */
class ConsultationController {

    /**
     * Função para acessr as consultas

    * @param {*} req Argumento de solicitação HTTP para a função de middleware, chamado de "req" por convenção.
     * @param {*} res Argumento de resposta HTTP para a função de middleware, chamado de "res" por convenção.
     */
    async consultations(req, res) {

        /**
         * Chamando as funções que carregam e populam os campos dos pacientes, os que estão na lista de espera,
         * os estagiários e os tipos de procedimentos.
         */

         /**Busca os nomes dos pacientes através do método searchAllPatients
          * @method searchAllPatients
          */
        const patients = await Patient.searchAllPatients();

         /** Busca os nomes dos pacientes na Lista de espera através do método searchWaitPatients
          * @method searchWaitPatients
          */
        const waitPatients = await Wait.searchWaitPatients();

         /** Busca os nomes dos estagiários através do método searchAllTrainees
          * @method searchAllTrainees 
          */
        const trainees = await Trainee.searchAllTrainees();
 
         /**Busca os tipos de procedimentos através do método searchAllProcedures
          * @method searchAllProcedures 
          */
        const procedure = await Procedure.searchAllProcedures();

        /**Verifica o nivel de acesso do usuário e logo em seguida busca pelo perfil dele, redirecionando para o calendário 
         * Após a validação do usuário ele busca no banco de dados as consultas de acordo com o nivel de acesso
        */
        if (req.user.NivelPermissaoId == 1) {
            const masterProfile = await Master.searchProfileMaster(req);

            /** Função que busca todas as consultas para o supervisor ou secretária
             * @method searchAllConsults
            */
            Consultation.searchAllConsults().then((consultation) => {
               
                /**O controlador renderiza a pagina do calendário passando  o 
                 * @argument procedure tipos de procedimentos
                 * @argument waitPatients nome dos pacientes que estão na lista de espera
                 * @argument masterProfile Perfil do usuário administrador
                 * @argument consultation Todas as consultas encontradas
                 * @argument patients o nome dos pacientes 
                 * @argument trainee o nome dos estagiários
                 */
                res.render('partials/calendar', {procedure:procedure, waitPatients: waitPatients, masterProfile: masterProfile, consultation: consultation, patients: patients, trainees: trainees });
                
                /**Caso ocorra algum erro na renderização é passado para o catch 
                 * @param err o erro ocorrido
                */
            }).catch((err) => {
                
                /**O catch ira retornar um erro para o usuário
                 * @argument err
                 */
                res.send('erro' + err);
            });
            
        /**Mesmo procedimento que ocorre com o supervisor, porém aqui verifica se o usuário é uma secretária */
        } else if (req.user.NivelPermissaoId == 2) {
            
            /**Carregando o nome da secretária */
            const secretaryProfile = await Secretary.searchProfileSecretary(req);
            
            /**Como o usuário possui o nivel de acesso de secretária é chamando a função do model
             *  consultations usando uma promisse
            */
            Consultation.searchAllConsults().then((consultation) => {
                  
                /**O controlador renderiza a pagina do calendário passando  praticamente os mesmo argumentos.
                    * Apenas o masterProfile será substituido pelo secretaryProfile
                 * @argument secretaryProfile Perfil do usuário secretaria
                 * */
                res.render('partials/calendar', {procedure:procedure, waitPatients: waitPatients, secretaryProfile: secretaryProfile, consultation: consultation, patients: patients, trainees: trainees });
            }).catch((err) => {
                res.send('erro' + err);
            });

        /**Verificando o nivel de permissão do usuário, no caso é estagiário */
        } else if (req.user.NivelPermissaoId == 3) {
            
            const traineeProfile = await Trainee.searchProfileTraineeUser(req);
            
               /** Função que busca todas as consultas que o estagiário tem vinculo passando como argumento o id do usuário logado.
             * @method searchConsultsTrainees
             * @param traineeProfile.id Id do estagiário
            */
            Consultation.searchConsultsTrainees(traineeProfile.id).then((consultation) => {

                res.render('partials/calendar', {procedure:procedure, traineeProfile: traineeProfile, consultation: consultation, patients: patients, trainees: trainees });
            }).catch((err) => {
                res.send('erro' + err);
            });
        } else if (req.user.NivelPermissaoId == 4) {
            //Busca o nome do usuário Pacientes
            const patientProfile = await Patient.searchProfilePatient(req);

            /** 
             * Função que busca todas as consultas que o paciente tem vinculo passando como argumento o id do usuário logado.
             * @method searchConsultsPatients
             * @param patientProfile.id Id do paciente
            */
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
            const traineeProfile = await Trainee.searchProfileTraineeUser(req);
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
    
    /**
     * Função para retornar apenas os agendamentos da consulta

    * @param {*} req Argumento de solicitação HTTP para a função de middleware, chamado de "req" por convenção.
     * @param {*} res Argumento de resposta HTTP para a função de middleware, chamado de "res" por convenção.
     */
    async onlySchedules(req, res) {
        //Carrega informação do paciente, lista de espera e estagiários
        const patients = await Patient.searchAllPatients();
        const waitPatients = await Wait.searchWaitPatients();
        const trainees = await Trainee.searchAllTrainees();

        //Usuário Administrador
            //Busca o nome do usuário ADMINISTRADOR
            const masterProfile = await Master.searchProfileMaster(req);
            /** Função que busca apenas os agendamentos para o supervisor ou secretária
             * @method searchAllConsults
            */
            Consultation.searchOnlySchedules().then((consultation) => {
                res.render('partials/calendar', { waitPatients: waitPatients, masterProfile: masterProfile, consultation: consultation, patients: patients, trainees: trainees });
            }).catch((err) => {
                res.send('erro' + err);
            });
            //Usuário Secretaria
    }

      /**
     * Função para marcar uma consulta ou agendamento.

     * @param {*} req Argumento de solicitação HTTP para a função de middleware, chamado de "req" por convenção.
     * @param {*} res Argumento de resposta HTTP para a função de middleware, chamado de "res" por convenção.
     */
    async saveConsult(req, res) {
        const { dateStart, timeStart, timeEnd, timeStartInit, description, patientId, traineeId, typeSchedule, patientWaitId,typeProcedure } = req.body;
        //converter formato brasileiro para SQL
        const date = dateStart +' '+ timeStart
        const datetime = dateFormat(date);
        
        const dateSchedule = dateStart +' '+ timeStartInit
        const datetimeInit = dateFormat(dateSchedule);

        const dateEnd = dateStart +' '+ timeEnd
        const datetimeEnd = dateFormat(dateEnd);
  
        let idMaster;
        let idSecretary;

        // Verifica se o tipo do agendamento é 1 - Consulta ou 2 - Agendamento e também verifica se o usuário é administrador ou secretaria
        if (typeSchedule == 1 && req.user.NivelPermissaoId == 1 || req.user.NivelPermissaoId == 2) {
            if (req.user.NivelPermissaoId == 1){

                /**
                 * Método para buscar o nome do Supevisor
                 * @method searchProfileMaster
                 */
                const masterProfile = await Master.searchProfileMaster(req);
                idMaster = masterProfile.id
                idSecretary = null;
            }else{
                 /**
                 * Método para buscar o nome da Secretária
                 * @method searchProfileSecretary
                 */
                const secretaryProfile = await Secretary.searchProfileSecretary(req);
                idSecretary = secretaryProfile.id
                idMaster = null;
            }
            //Caso seja consulta a cor é Azul
            const color = '#2B56E2';
            
            //Verificar se o usuário esta pegando um paciente para lista de pacientes ou da lista de espera
            if (patientId != 0) {

                /**
                 * Método para marcar uma consulta para o paciente
                 * @method insertConsults
                 * @param {datetime} datetime Data da consulta
                 * @param {Integer}idSecretary ID da Secretária
                 * @param {Integer}patientId ID do paciente
                 * @param {Integer}traineeId ID do estagiário
                 * @param {Integer}idMaster ID do supervisor
                 * @param {Integer}typeSchedule tipo da consulta
                 * @param {STRING}color cor que aparecerá a consulta
                 * @param {TEXT}description Observação na consulta
                 * @param {Integer}typeProcedure tipo do procedimento
                 */
                Consultation.insertConsults(date, idSecretary, patientId, traineeId, idMaster, typeSchedule, color, description, typeProcedure).then(function () {
                    req.flash("success_msg", "Consulta marcada com sucesso");
                    res.redirect('/dashboard');
                }).catch(function (err) {
                    req.flash("error_msg", "Erro ao marcar a consulta");
                    res.redirect('/dashboard');
                })
            } else {
                /**
                 * Método para ver marcar a data de saida do paciente da lista de espera.
                 * @method searchUpdateWait
                 * @param patientWaitId  ID do paciente da lista de espera
                 */
                Wait.searchUpdateWait(patientWaitId)
                 /**
                 * Método para inserir a consulta para um paciente da LISTA DE ESPERA
                 * @method insertConsults
                 * @param {datetime} datetime Data da consulta
                 * @param {Integer}idSecretary ID da Secretária
                 * @param {Integer}patientWaitId ID do paciente da lista de espera
                 * @param {Integer}traineeId ID do estagiário
                 * @param {Integer}idMaster ID do supervisor
                 * @param {Integer}typeSchedule tipo da consulta
                 * @param {STRING}color cor que aparecerá a consulta
                 * @param {TEXT}description Observação na consulta
                 * @param {Integer}typeProcedure tipo do procedimento
                 */
                Consultation.insertConsults(datetime, idSecretary, patientWaitId, traineeId, idMaster, typeSchedule, color, description, typeProcedure).then(function () {
                    req.flash("success_msg", "Consulta marcada com sucesso");
                    res.redirect('/dashboard');
                }).catch(function (err) {
                    req.flash("error_msg", "Erro ao marcar a consulta");
                    res.redirect('/dashboard');
                    console.log(err)
                })
            }
            /**
             * Verifica se o tipo do agendamento é 1 - Consulta ou 2 - Agendamento e também verifica se o usuário é administrador ou secretaria
             * 1º caso é a clínica que marca o agendamento para o paciente
             * 2º caso é o paciente que solicita o agendamento através do site
            */
        } else if (typeSchedule == 2 && req.user.NivelPermissaoId == 1 || req.user.NivelPermissaoId == 2) {
            
            const color = '#1FA576';
            /**
             * Verificando se o funcionario está marcando um agendamento para um paciente da lista de espera ou não.
             */
            if (patientId != null) {
                Consultation.insertSchedules(datetime, datetimeInit, patientId, color, description).then(function () {
                    req.flash("success_msg", "Agendamento marcada com sucesso");
                    res.redirect('/dashboard');
                }).catch(function (err) {
                    req.flash("error_msg", "Erro ao marcar a Agendamento");
                    res.redirect('/dashboard');
                    console.log(err)

                })
            } else {
                Consultation.insertSchedules(datetime, datetimeInit, patientWaitId, color, description).then(function () {
                    Wait.searchUpdateWait(patientWaitId)
                    req.flash("success_msg", "Consulta marcada com sucesso");
                    res.redirect('/dashboard');
                }).catch(function (err) {
                    req.flash("error_msg", "Erro ao marcar a consulta");
                    res.redirect('/dashboard');
                    console.log(err)

                })
            }
            //O paciente podera solicitar uma consulta
        } else {
            /**
             * Condição para o paciente solicitar a consulta.
             * A solicitação deve ser feita com no mínimo dois dias de antecedencia
             * Caso o contrário é exibido mensagem de erro
             */
            if(datetime <= moment.utc().add(2, 'days').format('YYYY-MM-DD HH:MM:SS')){
                req.flash("error_msg", "A data de Agendamento deve ser no minimo de 2 dias de diferença");
                res.redirect('/dashboard');
            } else {
                const color = '#1FA576';
                const id = req.user.id
                const patientProfile = await Patient.searchProfilePatientAuth(id);
                 /**
                 * Método para possibilitar o paciente solicitar o agendamento
                 */
                Consultation.insertSchedules(datetime, datetimeEnd, patientProfile.id, color, description).then(function () {
                    req.flash("success_msg", "Agendamento marcado com sucesso");
                    res.redirect('/dashboard');
                }).catch(function (err) {
                    req.flash("error_msg","Erro ao marcar o agendamento");
                    res.redirect('/dashboard');
                })
            }
        }
    }
     /**
     * Função para deletar um agendamento.

     * @param {*} req Argumento de solicitação HTTP para a função de middleware, chamado de "req" por convenção.
     * @param {*} res Argumento de resposta HTTP para a função de middleware, chamado de "res" por convenção.
     */
    deleteSchedules(req, res) {
        if (req.user.NivelPermissaoId == 1 || req.user.NivelPermissaoId == 2){
            /**
             * Método para deletar o agendamento
             * @method deleteSchedules
             * @param consultationId ID da consulta.
             */
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
 /**
     * Função para cancelar uma consulta.

     * @param {*} req Argumento de solicitação HTTP para a função de middleware, chamado de "req" por convenção.
     * @param {*} res Argumento de resposta HTTP para a função de middleware, chamado de "res" por convenção.
     */
    async cancelamentoSchedule(req, res) {
        if (req.user.NivelPermissaoId == 1 || req.user.NivelPermissaoId == 2){
                   /**
             * Método para cancelar a consulta
             * @method cancelConsultation
             * @param cancelId ID da consulta.
             */
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
    /**
     * Função para confirmar uma solicitação de consulta feita pelo paciente.

     * @param {*} req Argumento de solicitação HTTP para a função de middleware, chamado de "req" por convenção.
     * @param {*} res Argumento de resposta HTTP para a função de middleware, chamado de "res" por convenção.
     */
    confirmSchedules(req, res){
        if (req.user.NivelPermissaoId == 1 || req.user.NivelPermissaoId == 2){
            
            /**
             *Utilizando o body parser para buscar as informações digitadas pelo usuário  
             */

            const {dateInit, consultationId, traineeId, description, timeStart} = req.body;
            const date = dateInit +' '+ timeStart
            const datetime = dateFormat(date);

               /**
             * Método para confirmar o agendamento
             * @method deleteSchedules
             * @param {date} datetime DATA E HORA da consulta.
             * @param {Integer} consultationId ID da consulta.
             * @param {Integer} traineeId ID do estagiário.
             * @param {String} description Descrição da consulta
             */
            Consultation.confirmSchedule(datetime, consultationId, traineeId, description).then((result) => {
                req.flash("success_msg", "Consulta confirmada com ssucesso")
                res.redirect('/dashboard')
            }).catch((err) => {
                req.flash("error_msg", "Você ao confirmar a consulta")
                res.redirect('/dashboard')
                console.log(err)
                
            });
        }else{
            req.flash("error_msg", "Você não tem autorização")
            res.redirect('/dashboard')
        }
    }

    /**
     * Função para filtrar os dados do usuário pelo nome.

     * @param {*} req Argumento de solicitação HTTP para a função de middleware, chamado de "req" por convenção.
     * @param {*} res Argumento de resposta HTTP para a função de middleware, chamado de "res" por convenção.
     */
    async searchConsultPatient(req, res){

        /**
         * Usando a variável nome para concatenar o nome do paciente.
         * Assim possibilita a consulta através da condição LIKE do banco de dados
         */

        var campo = '%' + req.body.namePatient + '%';
        console.log(campo)
        Consultation.searchConsultNamePatient(campo).then((result) => {
            res.send(result);
        }).catch((err) => {
            req.flash("error_msg", "Não Encontrado")
        });

    }
    async searchConsultDate(req, res){
        const {dateFirst, dateEnd} = req.body;
        var startDay = moment.utc(dateFirst);
        startDay.set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
        var endDay = moment.utc(dateEnd);
        endDay.set({ hour: 23, minute: 59, second: 59, millisecond: 59 })
        const datetimeFirst = dateFormat(startDay);
        const datetimeEnd = dateFormat(endDay);

        await Consultation.searchConsultDate(datetimeFirst, datetimeEnd).then((result) => {
            res.send(result);
        }).catch((err) => {
            req.flash("error_msg", "Não Encontrado")
        });

    }
    async searchConsultNameDate(req, res){
        const {dateFirst, dateEnd} = req.body;
        var startDay = moment.utc(dateFirst);
        startDay.set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
        var endDay = moment.utc(dateEnd);
        endDay.set({ hour: 23, minute: 59, second: 59, millisecond: 59 })
        const datetimeFirst = dateFormat(startDay);
        const datetimeEnd = dateFormat(endDay);

        var campo = '%' + req.body.namePatient + '%';
        Consultation.searchConsultNameDate(campo, datetimeFirst, datetimeEnd).then((result) => {
            res.send(result);
        }).catch((err) => {
            req.flash("error_msg", "Não Encontrado")
        });

}


    
}

module.exports = ConsultationController;

