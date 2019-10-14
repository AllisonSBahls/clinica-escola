
const bd = require('./dbConnection');
const Secretary = require("./Secretary");
const Trainee = require("./Trainee");
const Patient = require("./Patient");
const Procedure = require("./Procedure");

const Consultation = bd.sequelize.define('consultations', {
    dateStart: {
        type: bd.Sequelize.DATE
    },
    dateEnd: {
        type: bd.Sequelize.DATE,
        allowNull: true,
    },
    description:{
        type: bd.Sequelize.STRING,
        allowNull: true,
    },
    color:{
        type: bd.Sequelize.STRING,
        allowNull: true,
    },
    typeSchedule: {
        type: bd.Sequelize.INTEGER,
        allowNull: true,
    },

});

Consultation.belongsTo(Secretary, {as : 'consultSecretary', foreingKey: {name: 'fk_consult_secretary'}});
Consultation.belongsTo(Patient, {as : 'consultPatient', foreingKey: {name: 'fk_consult_patient'}});
Patient.hasMany(Consultation, {as : 'schedulesPatient', foreingKey: {name: 'fk_schedules_patient'}});
Consultation.belongsTo(Trainee, {as : 'consultTrainee', foreingKey: {name: 'fk_consult_trainee'}});
Consultation.belongsTo(Procedure, {as : 'typeProcedure', foreingKey: {name: 'fk_procedure'}});
//Consultation.sync({force: true});       

module.exports = Consultation;