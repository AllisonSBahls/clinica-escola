const bd = require("./dbConnection");

const bd = require('./dbConnection');
const Master = bd.sequelize.define('Supervisors', {
    name: {
        type: bd.Sequelize.STRING,
    },
})

//Permissoes.sync({force: true})
module.exports = Permissoes;