
const bd = require('./dbConnection');

const Schedules = bd.sequelize.define('schedules', {
    dateStart: {
        type: bd.Sequelize.DATE
    },
    dateEnd: {
        type: bd.Sequelize.DATE,
        allowNull: true,
    },
    description:{
        type: bd.Sequelize.STRING,
        allowNull: true,
    },
    color:{
        type: bd.Sequelize.STRING,
        allowNull: true,
    },

});

module.exports = Schedules;
