
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
});

Master.belongsTo(Permissao, {as : 'NivelPermissao', foreingKey: {name: 'fk_permissao_master'}});



//Master.sync({force: true});


module.exports = Master;