const bd = require('./dbConnection');
const Permissao = require("./Permissoes");

const Master = bd.sequelize.define('Supervisors', {
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

Master.belongsTo(Permissao);

Master.sync({force: true});


module.exports = Master;