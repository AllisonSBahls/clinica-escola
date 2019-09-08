const bd = require('./dbConnection');
const Secretary = bd.sequelize.define('secretaries', {
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



//Secretary.sync({force: true});


module.exports = Secretary;