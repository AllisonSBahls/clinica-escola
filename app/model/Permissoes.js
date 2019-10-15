const bd = require('./dbConnection');

const Permissoes = bd.sequelize.define('permissoes', {
    permissao: {
        type: bd.Sequelize.STRING,
    },
})

// const perm1 = Permissoes.build({
//     id: '2',
//     permissao: 'Secretaria',
// })
// const perm2 = Permissoes.build({
//     id: '3',
//     permissao: 'Estagiário',
// })
// const perm3 =Permissoes.build({
//     id: '4',
//     permissao: 'Paciente',
// })

//Permissoes.sync({force: true})
module.exports = Permissoes;