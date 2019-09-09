
const bd = require('./dbConnection');
const Permissao = require("./Permissoes");

const Trainee = bd.sequelize.define('trainees', {
    name: {
        type: bd.Sequelize.STRING
    },
    email: {
        type: bd.Sequelize.STRING
    },
    phone: {
        type: bd.Sequelize.STRING
    },
    course: {
        type: bd.Sequelize.STRING
    },
    period: {
        type: bd.Sequelize.INTEGER
    },
    password: {
        type: bd.Sequelize.STRING
    }
   
});

Trainee.belongsTo(Permissao, {as : 'NivelPermissao', foreingKey: {name: 'fk_permissao_estagiario'}});

//Permissao.belongsTo(Trainee);

//Trainee.sync({force: true});


module.exports = Trainee;