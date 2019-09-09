const bd = require('./dbConnection');

const Permissoes = bd.sequelize.define('permissoes', {
    permissao: {
        type: bd.Sequelize.STRING,
    },
})

//Permissoes.sync({force: true})
module.exports = Permissoes;