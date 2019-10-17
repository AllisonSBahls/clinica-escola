
const bd = require('./dbConnection');
const User = require("./User");

const Master = bd.sequelize.define('supervisors', {
    name: {
        type: bd.Sequelize.STRING
    },
    phone: {
        type: bd.Sequelize.STRING
    },
});

Master.belongsTo(User, { as: 'userMaster', foreingKey: { name: 'fk_user_master' } });

Master.searchProfileMaster = async function (req) {
    return await Master.findOne({
        where: { userMasterId: req.user.id }
    });
}

Master.insertUserMaster = function (email, password, name, phone) {
    return User.create({
        email: email,
        password: password,
        NivelPermissaoId: 1
    }).then((user) => {
        Master.create({
            name: name,
            phone: phone,
            userMasterId: user.id
        })
    }).catch((err) => {
        console.log(err)
    });
}

Master.searchMasters = function () {
    return Master.findAll({
        include: [{
            model: User, as: 'userMaster'
        }]
    })
}

Master.deleteMaster = function(id){
    return Master.destroy({
        where: { 'id': id }
    })
}

Master.searchProfileUserMaster = function(id){
    return Master.findAll({
        where: { 'id': id },
        include: [{
            model: User, as: 'userMaster',
        },]
    })
}

Master.updateProfileMaster = function(name, phone, idMaster){
    return Master.update({
        name: name,
        phone: phone,
    },
        { where: { 'id': idMaster } }
    )
}


//Master.sync({force: true});       


module.exports = Master;