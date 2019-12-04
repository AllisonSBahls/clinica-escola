const bd = require('./dbConnection');
const Consultation = require("./Consultations");
const Master = require("./Master");
const Trainee = require("./Trainee");

const Presence = bd.sequelize.define('presences', {
    dateStart: {
        type: bd.Sequelize.DATE,
    },

    dateEnd: {
        type: bd.Sequelize.DATE,
    },

    Procedure:{
        type: bd.Sequelize.STRING,
    }
    
})

Presence.belongsTo(Trainee, { as: 'presenceTrainee', foreingKey: { name: 'fk_presence_trainee' , onDelete: 'restrict'} });
Presence.belongsTo(Consultation, { as: 'presenceConsultation', foreingKey: { name: 'fk_presence_consultation' }});
Presence.belongsTo(Master, { as: 'presenceMaster', foreingKey: { name: 'fk_presence_master' }, onDelete: 'restrict' });

Presence.insertFrequence = function(dateStart, dateEnd, Procedure, idTrainee, idConsult){
    return Presence.create({
        dateStart: dateStart,
        dateEnd: dateEnd,
        Procedure: Procedure,
        presenceTraineeId: idTrainee,
        presenceConsultationId: idConsult
    }).then(() => {

        Consultation.update({
            statusSchedules: 2
        },
        {
            where:{id: idConsult}
        }) 
    }).catch((err) => {
        res.send(err)
    });
}

Presence.searchAllFrequence = function(id){
    return Presence.findAll({
        include: [{
            model: Consultation, as: 'presenceConsultation',
        }, {
            model: Trainee, as: 'presenceTrainee',
        },{
            model: Master, as: 'presenceMaster',
        }]
    })
}

Presence.searchTraineeFrequence = function(id){
    return Presence.findAll({
        where: {
            presenceTraineeId: id
        },
        include: [{
            model: Consultation, as: 'presenceConsultation',
        }, {
            model: Trainee, as: 'presenceTrainee',
        },{
            model: Master, as: 'presenceMaster',
        }]
    })
}


Presence.validateFrequence = function(id, idMaster, idConsult){
    return Presence.update({
        presenceMasterId: idMaster
    },{
        where:{
            id: id
        },
    }).then(() => {
            Consultation.update({
                statusSchedules: 4,
                color: "#19165E"
            },
            {
                where:{id: idConsult}
            }) 
    }).catch((err) => {
        
    });
}

Presence.searchOneFrequence = async function(id){
    return await Presence.findOne({
        where:{
            id:id
        },
        include: [{
            model: Consultation, as: 'presenceConsultation',
        }]
    }).then((result)=>{
        Consultation.update({
            statusSchedules: 2,
        },{
            where:{
                id: result.presenceConsultationId,
            }
        })
    })
}

Presence.deleteFrequence = function(id){
    return Presence.destroy({
        where:{
            id: id
        }
    })
}
module.exports = Presence;