
const bd = require('./dbConnection');
const Secretary = require("./Secretary");
const Patient = require("./Patient");
const Master = require("./Master");
const moment = require('moment');


const Wait = bd.sequelize.define('listWait', {
    dateEntry: {
        type: bd.Sequelize.DATE
    },
    dateExit: {
        type: bd.Sequelize.DATE,
        allowNull: true,
    },
});

Wait.belongsTo(Secretary, {as : 'waitSecretary', foreingKey: {name: 'fk_wait_secretary'}});
Wait.belongsTo(Patient, {as : 'waitPatient', foreingKey: {name: 'fk_wait_patient'}});
Wait.belongsTo(Master, {as : 'waitMaster', foreingKey: {name: 'fk_wait_Master'}});

Wait.searchWaitPatients = async function(){
    return await this.findAll({
        order:['dateEntry'],
        where:{dateExit: null},
        include: [{
            model: Patient, as: 'waitPatient',
        }],
    
    });
}


Wait.searchUpdateWait = async function(patientWaitId){
    return await Wait.findOne({
        where: {waitPatientId: patientWaitId},
    }).then((waitId) =>{
        Wait.update({
            dateExit: moment(),
        },{
            where: {id: waitId.id}
        });
    }).catch((err)=>{
        console.log('Erro ao encontrar o id', err);
    });
}

Wait.insertWait =  async function(patientIdHidden, idMaster, idSecretary){
    return Wait.create({
        dateEntry: moment(),
        waitPatientId: patientIdHidden,
        waitMasterId: idMaster,
        waitSecretaryId: idSecretary
    })
}

//Consultation.sync({force: true});       


module.exports = Wait;