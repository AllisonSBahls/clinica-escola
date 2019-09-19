const Consultation = require('../model/Consultations');
const Patient = require('../model/Patient');
const Secretary = require('../model/Secretary');
const Trainee = require('../model/Trainee');
class ConsultationController {

    consultations(req, res) {
        Consultation.findAll({
            include: [{
                model: Patient, as: 'consultPatient'
            }]
        }).then((consultation)=>{
            res.render('partials/calendar', {consultation: consultation})
        })
    }
}

module.exports = ConsultationController;