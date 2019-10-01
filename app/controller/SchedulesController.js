// const Consultation = require('../model/Consultations');
// const Patient = require('../model/Patient');
// const Secretary = require('../model/Secretary');
// const Trainee = require('../model/Trainee');
// const Master = require('../model/Master');
// const Schedules = require('../model/Schedule');
// const IndexController = require('./IndexController');
// const moment = require('moment');

// class ConsultationController extends IndexController {

//     async consultations(req, res) {
//         const patients = await Patient.findAll();
//         const trainees = await Trainee.findAll();
//         const schedules = await PatientSchedules.findAll({
//             include: [{
//                 model: Patient, as: 'fk_patient_schedules'
//             },
//             {
//                 model: Schedules, as: 'fk_schedules_patient',
//             }]
//         });
//         if (req.user.NivelPermissaoId == 1) {
//             const masterProfile = await Master.findOne({
//                 where: { userMasterId: req.user.id }
//             });
//             Consultation.findAll({
//                 include: [{
//                     model: Patient, as: 'consultPatient',
//                 }, {
//                     model: Trainee, as: 'consultTrainee',
//                 }, {
//                     model: Secretary, as: 'consultSecretary',
//                 }]
//             }).then((consultation) => {
//                 res.render('partials/calendar', { schedules: schedules, masterProfile: masterProfile, consultation: consultation, patients: patients, trainees: trainees });

//             })
//         } else if (req.user.NivelPermissaoId == 2) {
//             const secretaryProfile = await Secretary.findOne({
//                 where: { userSecretaryId: req.user.id }
//             });
//             Consultation.findAll({
//                 include: [{
//                     model: Patient, as: 'consultPatient',
//                 }, {
//                     model: Trainee, as: 'consultTrainee',
//                 }, {
//                     model: Secretary, as: 'consultSecretary',
//                 }],
//                 where: { userTraineesId: patientId.id }

//             }).then((consultation) => {
//                 res.render('partials/calendar', { secretaryProfile: secretaryProfile, consultation: consultation, patients: patients, trainees: trainees });

//             })
//         } else if (req.user.NivelPermissaoId == 3) {
//             const traineeProfile = await Trainee.findOne({
//                 where: { userTraineeId: req.user.id }
//             });
//             Consultation.findAll({
//                 include: [{
//                     where: { consultTraineeId: traineeProfile.id },
//                     model: Patient, as: 'consultPatient',
//                 }, {
//                     model: Trainee, as: 'consultTrainee',
//                 }, {
//                     model: Secretary, as: 'consultSecretary',
//                 }],
//                 where: { userTraineesId: patientId.id }

//             }).then((consultation) => {
//                 res.render('partials/calendar', { traineeProfile: traineeProfile, consultation: consultation, patients: patients, trainees: trainees });

//             })
//         } else if (req.user.NivelPermissaoId == 4) {
//             await Patient.findOne({
//                 where: { userPatientId: req.user.id }
//             }).then((patientProfile) => {
//                 Consultation.findAll({
//                     include: [{
//                         model: Patient, as: 'consultPatient',
//                     }, {
//                         model: Trainee, as: 'consultTrainee',
//                     }, {
//                         model: Secretary, as: 'consultSecretary',
//                     }],
//                     where: { consultPatientId: patientProfile.id }
//                 }).then((consultation) => {
//                     res.render('partials/calendar', { patientProfile: patientProfile, consultation: consultation, patients: patients, trainees: trainees });

//                 }).catch((err) => {
//                     res.send('erro' + err);
//                 });
//             }).catch((err) => {
//                 res.send(`erro`)
//             })
//         }
//     }

//     async consultationsPatients(req, res) {
//         const patients = await Patient.findAll();
//         const trainees = await Trainee.findAll();
//         Consultation.findAll({
//             where: { consultPatientId: req.user.id },
//             include: [{
//                 model: Patient, as: 'consultPatient',
//             }, {
//                 model: Trainee, as: 'consultTrainee',
//             }, {
//                 model: Secretary, as: 'consultSecretary',
//             }]
//         }).then((consultation) => {
//             res.render('partials/calendar', { consultation: consultation, patients: patients, trainees: trainees });

//         })
//     }

//     async consult_save(req, res) {
//         if (req.user.NivelPermissaoId == 1 || req.user.NivelPermissaoId == 2) {
//             //converter formato brasileiro para SQL
//             var newDt = moment(req.body.dateStart, "DD/MM/YYYY HH:mm:ss")
//             var datetime = moment(newDt).format('YYYY-MM-DD HH:mm:ss');

//             Consultation.create({
//                 dateStart: datetime,
//                 consultPatientId: req.body.patientId,
//                 consultTraineeId: req.body.traineeId,
//                 color: '#A8B1E8',
//             }).then(function () {
//                 req.flash("success_msg", "Consulta marcada com sucesso");
//                 res.redirect('/calendar');
//             }).catch(function (err) {
//                 req.flash("error_msg", "Erro ao marcar a consulta");
//                 res.redirect('/calendar');

//             })
//         } else if (req.user.NivelPermissaoId == 4) {
//             //converter formato brasileiro para SQL
//             var newDt = moment(req.body.dateStart, "DD/MM/YYYY HH:mm:ss")
//             var datetimeStart = moment(newDt).format('YYYY-MM-DD HH:mm:ss');

//             const schedule = await Schedules.create({
//                 dateStart: datetimeStart,
//                 dateEnd: datetimeEnd,
//                 color: '#2C8E53',
//             });
//             PatientSchedules.create({
//                 description: req.body.description,
//                 fk_patient_schedules: req.body.PatientId,
//                 fk_schedules_patient: schedule.id,
//             }).then(function () {
//                 req.flash("success_msg", "Agendamento marcada com sucesso. Aguarde a confirmação da Secretaria");
//                 res.redirect('/agendamento');
//             }).catch(function (err) {
//                 req.flash("error_msg", "Erro ao marcar a consulta");
//                 res.redirect('/agendamento');
//             })
//         }
//     }
// }

// module.exports = ConsultationController;