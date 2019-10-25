
const bd = require('./dbConnection');
const Secretary = require("./Secretary");
const Trainee = require("./Trainee");
const Patient = require("./Patient");
const Procedure = require("./Procedure");
const moment = require('moment');
const { Op } = require('sequelize')

const Consultation = bd.sequelize.define('consultations', {
    dateStart: {
        type: bd.Sequelize.DATE
    },
    dateEnd: {
        type: bd.Sequelize.DATE,
        allowNull: true,
    },
    description: {
        type: bd.Sequelize.STRING,
        allowNull: true,
    },
    color: {
        type: bd.Sequelize.STRING,
        allowNull: true,
    },
    typeSchedule: {
        type: bd.Sequelize.INTEGER,
        allowNull: true,
    },

});

Consultation.searchAllConsults = function () {
    return this.findAll({
        where: {
            typeSchedule: {
                [Op.ne]: 3
            }
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

Consultation.searchOnlySchedules = function(){
    return this.findAll({
        where: {
            typeSchedule: 2
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
Consultation.searchConsultsTrainees = function (id) {
    return this.findAll({
        where: {
            consultTraineeId: id,
            typeSchedule: { [Op.ne]: 3 },
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

Consultation.searchConsultsPatients = function (id) {
    return this.findAll({
        where: {
            consultPatientId: id,
            typeSchedule: { [Op.ne]: 3 },
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

Consultation.insertConsults = function (dateStart, idSecretary, idPatient, idTrainee, typeSchedule, color, description) {
    return this.create({
        dateStart: dateStart,
        consultPatientId: idPatient,
        consultTraineeId: idTrainee,
        consultSecretaryId: idSecretary,
        color: color,
        description:description,
        typeSchedule: typeSchedule,
    });
}

Consultation.insertSchedules = async function (dateStart, idPatient, color, description) {
    return this.create({
        dateStart: dateStart,
        consultPatientId: idPatient,
        color: color,
        description: description,
        typeSchedule: 2,
    });
}

Consultation.deleteSchedules = function (consultationId) {
    return this.destroy({
        where: { id: consultationId }
    });
}

Consultation.cancelConsultation = function (cancelId) {
    return Consultation.update({
        typeSchedule: 3,
        color: '#992F2F'
    }, {
        where: {
            id: cancelId
        },
    })
}

Consultation.confirmSchedule = function(dateStart, consultID, traineeId, description) {
    return Consultation.update({
        dateStart: dateStart,
        consultTraineeId:traineeId,
        description:description,
        typeSchedule: 1,
        color: '#2B56E2'
    }, {
        where: {
            id: consultID
        },
    })
}

Consultation.searchConsultsWeek = async function (){
    console.log('------------------semana----------------------------')
    return await Consultation.findAll({
        order:['dateStart'],
        limit: 6,
        where: {
            typeSchedule: 1,
            dateStart: {
                [Op.between]: [moment.utc().day(0).minute(0), moment.utc().day(7).minute(59)]},
            },
        include: [{
            model: Patient, as: 'consultPatient',
        }, {
            model: Trainee, as: 'consultTrainee',
        }, {
            model: Secretary, as: 'consultSecretary',
        }]
    });
}

Consultation.searchConsultWeekPatient  = async function (patientId){
    return await Consultation.findAll({
        where: {
            typeSchedule: 1,
            consultPatientId: patientId, 
            dateStart: {
                [Op.between]: [moment.utc().day(0).minute(0), moment.utc().day(7).minute(59)]},
            },
        include: [{
            model: Patient, as: 'consultPatient',
        }, {
            model: Trainee, as: 'consultTrainee',
        }, {
            model: Secretary, as: 'consultSecretary',
        }]
    });
}

Consultation.searchConsultWeekTrainee  = async function (traineeId){
    return await Consultation.findAll({
        where: {
            consultTraineeId: traineeId
        },
        where: {
            dateStart: {
                [Op.between]: [moment.utc().day(0).minute(0), moment.utc().day(7).minute(59)]},
            },
        include: [{
            model: Patient, as: 'consultPatient',
        }, {
            model: Trainee, as: 'consultTrainee',
        }, {
            model: Secretary, as: 'consultSecretary',
        }]
    });
    
}

Consultation.searchConsultDay = async function (startDay, endDay){
    return await Consultation.findAll({
        limit: 6,
        where: {
            dateStart: {
                [Op.between]: [startDay, endDay]},
            },
        include: [{
            model: Patient, as: 'consultPatient',
        }, {
            model: Trainee, as: 'consultTrainee',
        }, {
            model: Secretary, as: 'consultSecretary',
        }]
    });
}

Consultation.searchConsultDayTrainee = async function (startDay, endDay, traineeId){    
    return await Consultation.findAll({
        limit: 6,
        where: {
            consultTraineeId: traineeId,
            dateStart: {
                [Op.between]: [startDay, endDay]},
            },
        include: [{
            model: Patient, as: 'consultPatient',
        }, {
            model: Trainee, as: 'consultTrainee',
        }, {
            model: Secretary, as: 'consultSecretary',
        }]
    });
} 
Consultation.searchConsultDayPatient = async function (startDay, endDay, patientId){    
    return await Consultation.findAll({
        limit: 6,
        where: {
            consultPatientId: patientId,
            dateStart: {
                [Op.between]: [startDay, endDay]},
            },
        include: [{
            model: Patient, as: 'consultPatient',
        }, {
            model: Trainee, as: 'consultTrainee',
        }, {
            model: Secretary, as: 'consultSecretary',
        }]
    });
}



Consultation.belongsTo(Secretary, { as: 'consultSecretary', foreingKey: { name: 'fk_consult_secretary' }, onDelete: 'restrict' });
Consultation.belongsTo(Patient, { as: 'consultPatient', foreingKey: { name: 'fk_consult_patient' }, onDelete: 'restrict' });
Patient.hasMany(Consultation, { as: 'schedulesPatient', foreingKey: { name: 'fk_schedules_patient' , onDelete: 'restrict'} });
Consultation.belongsTo(Trainee, { as: 'consultTrainee', foreingKey: { name: 'fk_consult_trainee' , onDelete: 'restrict'} });
Consultation.belongsTo(Procedure, { as: 'typeProcedure', foreingKey: { name: 'fk_procedure' } , onDelete: 'restrict'});
//Consultation.sync({force: true});       

module.exports = Consultation;