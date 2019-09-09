const bd = require('./dbConnection');
const Permissao = require("./Permissoes");

const User = bd.sequelize.define('users', {
    email: {
        type: bd.Sequelize.STRING
    },
    password: {
        type: bd.Sequelize.STRING
    },

});

User.belongsTo(Permissao, {as : 'NivelPermissao', foreingKey: {name: 'fk_permissao_usuario'}});
//User.sync({force: true});


module.exports = User;