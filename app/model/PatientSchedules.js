
const bd = require('./dbConnection');
const Patient = require("./Patient");
const Schedules = require("./Schedule");

const PatientSchedules = bd.sequelize.define('patient_schedules', {
    description:{
        type: bd.Sequelize.STRING,
    },  
});

Patient.belongsToMany(Schedules, {through: 'patient_schedules', foreignKey : {name: 'fk_patient_schedules', allowNull: false}});
Schedules.belongsToMany(Patient, {through: 'patient_schedules', foreignKey : {name: 'fk_schedules_patient', allowNull: false}});

module.exports = PatientSchedules;