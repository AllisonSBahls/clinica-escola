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

Trainee.searchAllTraineesUsers  = async function (){
    return Trainee.findAll({
        include: [{
            model: User, as: 'userTrainee'
        }]
    })
}

Trainee.searchProfileTrainee = async function(req){
    return await this.findOne({
        where: { userTraineeId: req.user.id }
    });
}

Trainee.insertTrainee = function(email, phone, course, period, password){
    return User.create({
        email: email,
        password: password,
        NivelPermissaoId: 3
    }).then((user)=>{
        this.create({
            name: name,
            phone: phone,
            course: course,
            period: period,
            userTraineeId: user.id
        })
    })
}

Trainee.searchOneTrainee = function(id){
    return Trainee.findAll({
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
            perioid:period,
            course:course
        }, { where: { 'id': id }
        })
}

Trainee.belongsTo(User, {as : 'userTrainee', foreingKey: {name: 'fk_user_trainee'},onDelete: 'cascade'});

//Trainee.sync({force: true});

module.exports = Trainee;