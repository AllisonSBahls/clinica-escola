
const Consultation = require('../model/Consultations');
const Secretary = require('../model/Secretary');
const Trainee = require('../model/Trainee');
const Master = require('../model/Master');
const Patient = require('../model/Patient');
const { Op } = require('sequelize')

async function consultAll(){
    return await Consultation.findAll({
         where: {
             typeSchedule: {
                 [Op.ne]: 3 }
             },
         include: [{
             model: Patient, as: 'consultPatient',
         }, {
             model: Trainee, as: 'consultTrainee',
         }, {
             model: Secretary, as: 'consultSecretary',
         }]
     })
 }

async function consultsTrainee(id){
 return await Consultation.findAll({
    where: {
        consultTraineeId: id,
        typeSchedule:  { [Op.ne]: 3 },
    },
     include: [{  
         model: Patient, as: 'consultPatient',
     }, {
         model: Trainee, as: 'consultTrainee',
     }, {
         model: Secretary, as: 'consultSecretary',
     }],
})
}

async function consultsPatient(id){
 return await Consultation.findAll({
     include: [{
         model: Patient, as: 'consultPatient',
     }, {
         model: Trainee, as: 'consultTrainee',
     }, {
         model: Secretary, as: 'consultSecretary',
     }],
     where: { consultPatientId: id,
        typeSchedule:  { [Op.ne]: 3 },
     }
 })
}

module.exports = {
    consultAll,
    consultsTrainee,
    consultsPatient,
}
