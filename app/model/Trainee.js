const bd = require('./dbConnection');
const User = require('./User');

const Trainee = bd.sequelize.define('trainees', {
    name: {
        type: bd.Sequelize.STRING
    },
    phone: {
        type: bd.Sequelize.STRING
    },
    course: {
        type: bd.Sequelize.STRING
    },
    period: {
        type: bd.Sequelize.INTEGER
    },   
});


Trainee.searchAllTrainees = async function (){
    return await this.findAll();
}

Trainee.searchProfileTrainee = async function(req){
    return await Trainee.findOne({
        where: { userTraineeId: req.user.id }
    });
}

Trainee.belongsTo(User, {as : 'userTrainee', foreingKey: {name: 'fk_user_trainee'}});

//Trainee.sync({force: true});

module.exports = Trainee;