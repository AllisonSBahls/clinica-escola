const bd = require('./dbConnection');
const Consultation = require("./Consultations");

const Presence = bd.sequelize.define('presences', {
    dateStart: {
        type: bd.Sequelize.DATE,
    },

    dateStart: {
        type: bd.Sequelize.DATE,
    },

    Procedure:{
        type: bd.Sequelize.STRING,
    }
})

Presence.belongsTo(Consultation, { as: 'presenceConsultation', foreingKey: { name: 'fk_presence_consultation' }});



module.exports = Presence;