const bd = require('./dbConnection');
const User = require('./User');
const { Op } = require('sequelize')

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

Trainee.searchAllTraineesUsers  = async function (){
    return Trainee.findAll({
        include: [{
            model: User, as: 'userTrainee'
        }]
    })
}

Trainee.searchProfileTraineeUser = async function(req){
    return await this.findOne({
        where: { userTraineeId: req.user.id }
    });
}


Trainee.searchProfileTrainee = async function(id){
    return await this.findOne({
        where: { id: id }
    });
}

Trainee.searchTraineeName = function(name){
    return Trainee.findAll({
        where: { 
            name:{
                [Op.like]: name,
            }  
        },
        include: [{
            model: User, as: 'userTrainee'
        }]
    })
}


Trainee.insertTrainee = function(name, email, phone, course, period, password){
    return User.create({
        email: email,
        password: password,
        NivelPermissaoId: 3,
        statusUser: true,
    }).then((user)=>{
        Trainee.create({
            name: name,
            phone: phone,
            course: course,
            period: period,
            userTraineeId: user.id
        })
    })
}



Trainee.searchOneTrainee = function(id){
    return Trainee.findOne({
        where: { 'id': id },
        include: [{
            model: User, as: 'userTrainee',
        }]
    })
}

Trainee.deleteTrainee = function(id){
    return User.destroy({
        where: { 'id': id }
    })
}

Trainee.updateTrainee = function(name, phone, period, course, id){
    return Trainee.update({
            name:name,
            phone:phone,
            period:period,
            course:course
        }, { where: { 'id': id }
        })
}

Trainee.belongsTo(User, {as : 'userTrainee', foreingKey: {name: 'fk_user_trainee'},onDelete: 'cascade'});

//Trainee.sync({force: true});

module.exports = Trainee;