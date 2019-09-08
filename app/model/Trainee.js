
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
    },
    permissionID: {
        type: bd.Sequelize.INTEGER,
        references: {
            model: 'permissoes',
            key: 'id',
        }
    }
});

//Permissao.belongsTo(Trainee);

//Trainee.sync({force: true});


module.exports = Trainee;