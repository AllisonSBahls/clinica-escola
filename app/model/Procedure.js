const bd = require('./dbConnection');

const Procedures = bd.sequelize.define('procedures', {
    typeProcedure: {
        type: bd.Sequelize.STRING,
        allowNull: false,
    },
})


//Permissoes.sync({force: true})
module.exports = Procedures;