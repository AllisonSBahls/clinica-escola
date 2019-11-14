const bd = require('./dbConnection');
const Permissao = require("./Permissoes");

const User = bd.sequelize.define('users', {
    email: {
        type: bd.Sequelize.STRING
    },
    password: {
        type: bd.Sequelize.STRING
    },
    googleID: {
        type: bd.Sequelize.STRING
    },
    statusUser: {
        type: bd.Sequelize.BOOLEAN
        },

});

User.belongsTo(Permissao, {as : 'NivelPermissao', foreingKey: {name: 'fk_permissao_usuario'}});
//User.sync({force: true});

User.verifyEmail = async function(email) {
    return await this.findAll({
        where: { email: email }
    })
}
User.findUser = function(id){
    return User.findOne({
        where: { googleID: id }
    })
}
User.searchEmailUser = async function(idUser){
    return await this.findOne({
        where: { id: idUser}
    })
}

User.searchPasswordUser = async function(req){
    return await this.findOne({
        where: { id: req.user.id}
    })
}

User.insertUserAuth = async function(googleID, email){
    return await User.create({
        email:email,
        googleID: googleID,
        NivelPermissaoId: 4,
        statusUser: true,
    })
}

User.updateEmailUser = async function(idUser, email){
    return await this.update({
        email: email
    },{ 
        where: { id: idUser }, 
    }); 
}

User.updatePassword = function(password, req){
    return this.update({
        password: password
    },{
        where: {id: req.user.id}
    })

}

User.searchEmailUser = async function(idPatient){
    return await User.findAll({
        where:{
            id: idPatient
        }
})
}

module.exports = User;