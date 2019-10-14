
const bd = require('./dbConnection');
const Secretary = require("./Secretary");
const Patient = require("./Patient");
const Master = require("./Master");


const Wait = bd.sequelize.define('listWait', {
    dateEntry: {
        type: bd.Sequelize.DATE
    },
    dateExit: {
        type: bd.Sequelize.DATE,
        allowNull: true,
    },
});

Wait.belongsTo(Secretary, {as : 'waitSecretary', foreingKey: {name: 'fk_wait_secretary'}});
Wait.belongsTo(Patient, {as : 'waitPatient', foreingKey: {name: 'fk_wait_patient'}});
Wait.belongsTo(Master, {as : 'waitMaster', foreingKey: {name: 'fk_wait_Master'}});

//Consultation.sync({force: true});       


module.exports = Wait;