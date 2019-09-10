const bd = require('./dbConnection');
const User = require('./User');

const Secretary = bd.sequelize.define('secretaries', {
    name: {
        type: bd.Sequelize.STRING
    },

    phone: {
        type: bd.Sequelize.STRING
    },
});

Secretary.belongsTo(User, {as : 'userSecretary', foreingKey: {name: 'fk_user_secretaria'}});

//Secretary.sync({force: true});

module.exports = Secretary;