
const bd = require('./dbConnection');

const Schedule = bd.sequelize.define('schedules', {
    dateStart: {
        type: bd.Sequelize.DATE
    },
    dateEnd: {
        type: bd.Sequelize.DATE,
        allowNul: true,
    },
    color:{
        type: bd.Sequelize.STRING,
        allowNul: true,
    },
   
});


//Schedules.sync({force: true});   


module.exports = Schedule;