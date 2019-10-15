const bd = require('./dbConnection');

const Procedures = bd.sequelize.define('procedures', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: bd.Sequelize.INTEGER,
      }, 
    typeProcedure: {
        type: bd.Sequelize.STRING,
        allowNull: false,
    },
})


//Permissoes.sync({force: true})
module.exports = Procedures;