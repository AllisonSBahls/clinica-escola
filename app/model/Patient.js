const bd = require('./dbConnection');
const User = require("./User");

const Patient = bd.sequelize.define('patients', {
    name: {
        type: bd.Sequelize.STRING
    },
    phone: {
        type: bd.Sequelize.STRING
    },
    dateBirth: {
        type: bd.Sequelize.DATE
    },
    gender: {
        type: bd.Sequelize.INTEGER
    },
});

Patient.belongsTo(User, {as : 'userPatient', foreingKey: {name: 'fk_user_patient'}});


//Patient.sync({force: true});


module.exports = Patient;