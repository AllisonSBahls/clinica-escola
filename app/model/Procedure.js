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
    description:{
        type: bd.Sequelize.STRING,
    }
})

Procedures.searchAllProcedures = async function (){
    return await Procedures.findAll();
}

//Permissoes.sync({force: true})
module.exports = Procedures;