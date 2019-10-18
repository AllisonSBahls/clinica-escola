const bd = require('./dbConnection');
const User = require('./User');

const Secretary = bd.sequelize.define('secretaries', {
    name: {
        type: bd.Sequelize.STRING
    },

    phone: {
        type: bd.Sequelize.STRING
    },
});

Secretary.belongsTo(User, {as : 'userSecretary', foreingKey: {name: 'fk_user_secretaria'}});

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

Secretary.deleteSecretary = function(id){
    return Secretary.destroy({
        where: { 'id': id }
    })
}

Secretary.searchOneSecretary = function(){
    
}
//Secretary.sync({force: true});

module.exports = Secretary;