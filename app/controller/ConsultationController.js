const Consultation = require('../model/Consultations');
const Patient = require('../model/Patient');
const Secretary = require('../model/Secretary');
const Trainee = require('../model/Trainee');
const moment= require( 'moment' );

class ConsultationController {

   async consultations(req, res) {
        const patients = await Patient.findAll();
        const trainees = await Trainee.findAll();
        Consultation.findAll({
            include: [{
                model: Patient, as: 'consultPatient',
            },{
                model: Trainee, as: 'consultTrainee',
            },{
                model: Secretary, as: 'consultSecretary',
            }]
        }).then((consultation)=>{
            res.render('partials/calendar', {consultation: consultation, patients: patients, trainees:trainees});
        
        })
    }

    consult_save(req, res){
        //converter formato brasileiro para SQL
        var newDt = moment(req.body.dateStart,"DD/MM/YYYY HH:mm:ss")
        var datetime = moment(newDt).format('YYYY-MM-DD HH:mm:ss');

        Consultation.create({
        dateStart: datetime,
        consultPatientId: req.body.patientId,
        consultTraineeId: req.body.traineeId,
        color: '#A8B1E8',
    }).then(function () {
        req.flash("success_msg", "Consulta marcada com sucesso");
        res.redirect('/calendar');
    }).catch(function(err) {
        req.flash("error_msg", "Erro ao marcar a consulta");
        res.redirect('/calendar');

    })
    }    
}

module.exports = ConsultationController;