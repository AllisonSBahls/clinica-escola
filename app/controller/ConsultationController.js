const Consultation = require('../model/Consultations');
const Patient = require('../model/Patient');
const Secretary = require('../model/Secretary');
const Trainee = require('../model/Trainee');
class ConsultationController {

    Consultations(req, res) {
        Consultation.findAll({
            include: [{
                model: Patient, as: 'consultPatient'
            }]
        })
    }
}

module.exports = ConsultationController;