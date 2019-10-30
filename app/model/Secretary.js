const bd = require('./dbConnection');
const User = require('./User');
const { Op } = require('sequelize')

const Secretary = bd.sequelize.define('secretaries', {
    name: {
        type: bd.Sequelize.STRING
    },

    phone: {
        type: bd.Sequelize.STRING
    },
});

Secretary.belongsTo(User, {as : 'userSecretary', foreingKey: {name: 'fk_user_secretaria'},onDelete: 'cascade'});

Secretary.searchProfileSecretary = async function(req) {
    return await this.findOne({
        where: { userSecretaryId: req.user.id }
    });
}

Secretary.insertSecretary = function(email, secretPassword, name, phone){
    return User.create({
        email: email,
        password: secretPassword,
        NivelPermissaoId: 2
    }).then((user)=>{
        Secretary.create({
            name: name,
            phone: phone,
            userSecretaryId: user.id
        })
    });
}

Secretary.searchAllSecretaries = function(){
    return this.findAll({
        include: [{
            model: User, as: 'userSecretary'
        }]
    })
}

Secretary.searchNameSecretary= function(name){
    return Secretary.findAll({
        where:{
            name:{
                [Op.like]: name,
            }  
        },
        include: [{
            model: User, as: 'userSecretary'
        }]
    })
}

Secretary.deleteSecretary = function(id){
    return User.destroy({
        where: { 'id': id }
    })
}

Secretary.searchOneSecretary = function(id){
    return Secretary.findOne({
        where: { 'id': id },
        include: [{
            model: User, as: 'userSecretary',
        }]
    })
}

Secretary.updateSecretary = function(name, phone, id){
    return Secretary.update({
        name: name,
        phone: phone,
    }, { where: { 'id': id } }
    )
}
//Secretary.sync({force: true});

module.exports = Secretary;