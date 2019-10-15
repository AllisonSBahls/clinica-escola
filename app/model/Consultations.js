
const bd = require('./dbConnection');
const Secretary = require("./Secretary");
const Trainee = require("./Trainee");
const Patient = require("./Patient");
const Procedure = require("./Procedure");
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

Consultation.insertConsults = function (dateStart, idPatient, idTrainee, typeSchedule, color) {
    return this.create({
        dateStart: dateStart,
        consultPatientId: idPatient,
        consultTraineeId: idTrainee,
        color: color,
        typeSchedule: typeSchedule,
    });
}

Consultation.insertSchedules = async function (dateStart, idPatient, color, typeSchedule) {
    return this.create({
        dateStart: dateStart,
        consultPatientId: idPatient,
        color: color,
        typeSchedule: typeSchedule,
    });
}


Consultation.belongsTo(Secretary, { as: 'consultSecretary', foreingKey: { name: 'fk_consult_secretary' } });
Consultation.belongsTo(Patient, { as: 'consultPatient', foreingKey: { name: 'fk_consult_patient' } });
Patient.hasMany(Consultation, { as: 'schedulesPatient', foreingKey: { name: 'fk_schedules_patient' } });
Consultation.belongsTo(Trainee, { as: 'consultTrainee', foreingKey: { name: 'fk_consult_trainee' } });
Consultation.belongsTo(Procedure, { as: 'typeProcedure', foreingKey: { name: 'fk_procedure' } });
//Consultation.sync({force: true});       

module.exports = Consultation;