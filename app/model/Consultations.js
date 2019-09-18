
const bd = require('./dbConnection');
const Secretary = require("./Secretary");
const Trainee = require("./Trainee");
const Patient = require("./Patient");


const Consultation = bd.sequelize.define('consultations', {
    dateStart: {
        type: bd.Sequelize.DATE
    },
    dateEnd: {
        type: bd.Sequelize.DATE,
        allowNul: true,
    },
    description:{
        type: bd.Sequelize.STRING,
        allowNul: true,
    }

});

Consultation.belongsTo(Secretary, {as : 'consultSecretary', foreingKey: {name: 'fk_consult_secretary'}});
Consultation.belongsTo(Patient, {as : 'consultPatient', foreingKey: {name: 'fk_consult_patient'}});
Consultation.belongsTo(Trainee, {as : 'consultTrainee', foreingKey: {name: 'fk_consult_trainee'}});


//Consultation.sync({force: true});       


module.exports = Consultation;