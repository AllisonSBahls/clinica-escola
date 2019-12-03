const bd = require('./dbConnection');
const Secretary = require("./Secretary");
const Master = require("./Master");
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
    statusSchedules:{
        type: bd.Sequelize.INTEGER,
    }

});
Consultation.belongsTo(Secretary, { as: 'consultSecretary', foreingKey: { name: 'fk_consult_secretary' }, onDelete: 'restrict' });
Consultation.belongsTo(Patient, { as: 'consultPatient', foreingKey: { name: 'fk_consult_patient' }, onDelete: 'restrict' });
Consultation.belongsTo(Master, { as: 'consultMaster', foreingKey: { name: 'fk_consult_master' }, onDelete: 'restrict' });
Patient.hasMany(Consultation, { as: 'schedulesPatient', foreingKey: { name: 'fk_schedules_patient' , onDelete: 'restrict'} });
Consultation.belongsTo(Trainee, { as: 'consultTrainee', foreingKey: { name: 'fk_consult_trainee' , onDelete: 'restrict'} });
Consultation.belongsTo(Procedure, { as: 'typeProcedure', foreingKey: { name: 'fk_procedure' } , onDelete: 'restrict'});

//Consultation.sync({force: true});       

Consultation.searchAllConsults = async function () {
    return await this.findAll({
        order:['dateStart'],
        where: {
            typeSchedule: {
                [Op.ne]: 3 
            }
        },
        include: [{
            model: Patient, as: 'consultPatient',
        }, {
            model: Trainee, as: 'consultTrainee',
        },{
            model: Master, as: 'consultMaster',
        }, {
            model: Secretary, as: 'consultSecretary',
        }]
    })
}

Consultation.searchOnlySchedules = function(){
    return this.findAll({
        order:['dateStart'],
        where: {
            typeSchedule: 2
        },
        include: [{
            model: Patient, as: 'consultPatient',
        }, {
            model: Trainee, as: 'consultTrainee',
        },{
            model: Master, as: 'consultMaster',
        }, {
            model: Secretary, as: 'consultSecretary',
        }]
    })
}

Consultation.searchOneConsultation = function(id){
    return this.findOne({
        where:{
            id: id
        },
        include: [{
            model: Patient, as: 'consultPatient',
        }, {
            model: Trainee, as: 'consultTrainee',
        },{
            model: Master, as: 'consultMaster',
        },{
            model: Secretary, as: 'consultSecretary',
        }],
    })
}

Consultation.searchConsultsTrainees = async function (id) {
    return await this.findAll({
        order:['dateStart'],
        where: {
            consultTraineeId: id,
            typeSchedule: { [Op.ne]: 3,  },
            },
        include: [{
            model: Patient, as: 'consultPatient',
        }, {
            model: Trainee, as: 'consultTrainee',
        },{
            model: Master, as: 'consultMaster',
        },{
            model: Secretary, as: 'consultSecretary',
        }],
    })
}


Consultation.searchConsultsTraineesDate = async function (id) {
    return await this.findAll({
        order:['dateStart'],
        where: {
            consultTraineeId: id,
            typeSchedule: { 
                [Op.ne]: 3,
            },
            statusSchedules: { 
                [Op.ne]: 4,  
            },
            },
        include: [{
            model: Patient, as: 'consultPatient',
        }, {
            model: Trainee, as: 'consultTrainee',
        },{
            model: Master, as: 'consultMaster',
        },{
            model: Secretary, as: 'consultSecretary',
        }],
    })
}
Consultation.searchConsultsTraineesReports = async function (id) {
    return await this.findAll({
        order:['dateStart'],
        where: {
            consultTraineeId: id,
            typeSchedule: { 
                [Op.ne]: 3,
            },
        },
        include: [{
            model: Patient, as: 'consultPatient',
        }, {
            model: Trainee, as: 'consultTrainee',
        },{
            model: Master, as: 'consultMaster',
        },{
            model: Secretary, as: 'consultSecretary',
        }],
    })
}

Consultation.searchConsultsPatients = function (id) {
    return this.findAll({
        order:['dateStart'],
        where: {
            consultPatientId: id,
            statusSchedules: { [Op.ne]: 5 },
        },
        include: [{
            model: Patient, as: 'consultPatient',
        },{
            model: Master, as: 'consultMaster',
        }, {
            model: Trainee, as: 'consultTrainee',
        }, {
            model: Secretary, as: 'consultSecretary',
        }],
    })
}

Consultation.countSchedule = async function(){
    return await this.findAll({
        attributes:[[bd.Sequelize.fn('count', bd.Sequelize.col ('typeSchedule')),  'typeSchedule']],
        where:{
            typeSchedule: 2,
            dateStart:{
                [Op.gte]: moment.utc()
            }
        }
    })
}

/**
 * Inserir as consultas
 */
Consultation.insertConsults = function (dateStart, idSecretary, idPatient, idTrainee, idMaster, typeSchedule, color, description, idProcedure) {
    return this.create({
        dateStart: dateStart,
        consultPatientId: idPatient,
        consultTraineeId: idTrainee,
        consultSecretaryId: idSecretary,
        consultMasterId: idMaster,
        color: color,
        description:description,
        typeSchedule: typeSchedule,
        typeProcedureId: idProcedure,
        statusSchedules: 2
    });
}

Consultation.insertSchedules = async function (dateStart,  dateEnd, idPatient, color, description) {
    return this.create({
        dateStart: dateStart,
        dateEnd: dateEnd,
        consultPatientId: idPatient,
        color: color,
        description: description,
        typeSchedule: 2,
        statusSchedules: 1

    });
}

Consultation.deleteSchedules = function (consultationId) {
    return this.destroy({
        where: { id: consultationId }
    });
}

Consultation.cancelConsultation = function (cancelId) {
    return Consultation.update({
        statusSchedules: 5,
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
        dateEnd:  null,
        consultTraineeId:traineeId,
        description:description,
        typeSchedule: 1,
        color: '#2B56E2',
        statusSchedules: 2
    }, {
        where: {
            id: consultID
        },
    })
}

Consultation.searchNextConsultation = async function (){
    return await Consultation.findAll({
        order:['dateStart'],
        limit: 6,
        where: {
            dateStart: {
                    [Op.gte]:moment.utc()
                },
            },
        include: [{
            model: Patient, as: 'consultPatient',
        },{
            model: Master, as: 'consultMaster',
        }, {
            model: Trainee, as: 'consultTrainee',
        }, {
            model: Secretary, as: 'consultSecretary',
        }]
    });
}

Consultation.searchNextConsultation = async function (){
    return await Consultation.findAll({
        order:['dateStart'],
        limit: 6,
        where: {
            dateStart: {
                [Op.gte]:moment.utc()
            },
        },
        include: [{
            model: Patient, as: 'consultPatient',
        },{
            model: Master, as: 'consultMaster',
        }, {
            model: Trainee, as: 'consultTrainee',
        }, {
            model: Secretary, as: 'consultSecretary',
        }]
    });
}

Consultation.searchConsultNextPatient  = async function (patientId){
    return await Consultation.findAll({
        order:['dateStart'],
        where: {
            consultPatientId: patientId, 
            dateStart: {
                [Op.gte]:moment.utc()
            },
        },
        include: [{
            model: Patient, as: 'consultPatient',
        },{
            model: Master, as: 'consultMaster',
        }, {
            model: Trainee, as: 'consultTrainee',
        }, {
            model: Secretary, as: 'consultSecretary',
        }]
    });
}

Consultation.searchConsultNextTrainee  = async function (traineeId){
    return await Consultation.findAll({
        order:['dateStart'],
        where: {    
            typeSchedule: 1,
            consultTraineeId: traineeId,
            dateStart: {
                [Op.gte]:moment.utc()
            },
        },
        include: [{
            model: Patient, as: 'consultPatient',
        },{
            model: Master, as: 'consultMaster',
        }, {
            model: Trainee, as: 'consultTrainee',
        }, {
            model: Secretary, as: 'consultSecretary',
        }]
    });
    
}

Consultation.searchConsultDay = async function (startDay, endDay){
    return await Consultation.findAll({
        order:['dateStart'],
        limit: 6,
        where: {
            dateStart: {
                [Op.between]: [startDay, endDay]},
            },
        include: [{
            model: Patient, as: 'consultPatient',
        },{
            model: Master, as: 'consultMaster',
        },{
            model: Trainee, as: 'consultTrainee',
        }, {
            model: Secretary, as: 'consultSecretary',
        }]
    });
}

Consultation.searchConsultDayTrainee = async function (startDay, endDay, traineeId){    
    return await Consultation.findAll({
        order:['dateStart'],
        limit: 6,
        where: {
            consultTraineeId: traineeId,
            typeSchedule: 1,
            dateStart: {
                [Op.between]: [startDay, endDay]},
            },
        include: [{
            model: Patient, as: 'consultPatient',
        },{
            model: Master, as: 'consultMaster',
        }, {
            model: Trainee, as: 'consultTrainee',
        }, {
            model: Secretary, as: 'consultSecretary',
        }]
    });
} 
Consultation.searchConsultDayPatient = async function (startDay, endDay, patientId){    
    return await Consultation.findAll({
        order:['dateStart'],
        limit: 6,
        where: {
            consultPatientId: patientId,
            dateStart: {
                [Op.between]: [startDay, endDay]},
            },
        include: [{
            model: Patient, as: 'consultPatient',
        },{
            model: Master, as: 'consultMaster',
        }, {
            model: Trainee, as: 'consultTrainee',
        }, {
            model: Secretary, as: 'consultSecretary',
        }]
    });
}

Consultation.searchConsultNamePatient = async function (name){
    return await Consultation.findAll({
        order:['dateStart'],
      
        include: [{
            model: Patient, as: 'consultPatient',
            where: {
                name: {
                    [Op.like]: name,
                },
            },
        },{
            model: Master, as: 'consultMaster',
        }, {
            model: Trainee, as: 'consultTrainee',
        }, {
            model: Secretary, as: 'consultSecretary',
        }]
    });
} 

Consultation.searchConsultDate = async function (dateFirst, dateEnd){    
    return await Consultation.findAll({
        order:['dateStart'],
        where: {
            dateStart: {
                [Op.between]: [dateFirst, dateEnd]},
            },
        include: [{
            model: Patient, as: 'consultPatient',
        },{
            model: Master, as: 'consultMaster',
        }, {
            model: Trainee, as: 'consultTrainee',
        }, {
            model: Secretary, as: 'consultSecretary',
        }]
    });
} 

Consultation.searchConsultNameDate = async function (name, dateFirst, dateEnd){    
    return await Consultation.findAll({
        order:['dateStart'],
        where: {
            dateStart: {
                [Op.between]: [dateFirst, dateEnd]},
            },
        include: [{
            model: Patient, as: 'consultPatient',
            where: {
                name: {
                    [Op.like]: name,
                },
            },
        },{
            model: Master, as: 'consultMaster',
        }, {
            model: Trainee, as: 'consultTrainee',
        }, {
            model: Secretary, as: 'consultSecretary',
        }]
    });
} 

Consultation.searchConsultSendEmail = async function(StartDay, endDay){
    return await Consultation.findAll({
        where: {
            dateStart: {
                [Op.between]: [StartDay, endDay]},
            },
        include: [{
            model: Patient, as: 'consultPatient',
        },{
            model: Master, as: 'consultMaster',
        },{
            model: Trainee, as: 'consultTrainee',
        }, {
            model: Secretary, as: 'consultSecretary',
        }]
    });
}

module.exports = Consultation;