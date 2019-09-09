const bd = require('./dbConnection');
const Permissao = require("./Permissoes");
const bcrypt = require("bcryptjs");

const Patient = bd.sequelize.define('patients', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: bd.Sequelize.INTEGER
    },
    name: {
        type: bd.Sequelize.STRING
    },
    email: {
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
    password: {
        type: bd.Sequelize.STRING
    },
},{
    hooks:{
        beforeCreate: patient => {
            const salt = 10;
            patient.set('password', bcrypt.hash(patient.password), salt);
        }
    },

    
});

Patient.belongsTo(Permissao, {as : 'NivelPermissao', foreingKey: {name: 'fk_permissao_paciente'}});


//Patient.sync({force: true});


module.exports = Patient;