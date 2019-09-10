
const bd = require('./dbConnection');
const User = require("./User");

const Master = bd.sequelize.define('supervisors', {
    name: {
        type: bd.Sequelize.STRING
    },
    phone: {
        type: bd.Sequelize.STRING
    },
});

Master.belongsTo(User, {as : 'userMaster', foreingKey: {name: 'fk_user_master'}});

//Master.sync({force: true});       


module.exports = Master;