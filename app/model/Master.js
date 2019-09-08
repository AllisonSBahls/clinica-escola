
const bd = require('./dbConnection');
const Permissao = require("./Permissoes");

const Master = bd.sequelize.define('supervisors', {
    name: {
        type: bd.Sequelize.STRING
    },
    email: {
        type: bd.Sequelize.STRING
    },
    phone: {
        type: bd.Sequelize.STRING
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

//Permissao.belongsTo(Master);

//Master.sync({force: true});


module.exports = Master;