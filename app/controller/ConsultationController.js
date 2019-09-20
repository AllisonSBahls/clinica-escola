const Consultation = require('../model/Consultations');
const Patient = require('../model/Patient');
const Secretary = require('../model/Secretary');
const Trainee = require('../model/Trainee');
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

}

module.exports = ConsultationController;