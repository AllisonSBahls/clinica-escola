const bd = require('./dbConnection');
const User = require("./User");

const Patient = bd.sequelize.define('patients', {
    name: {
        type: bd.Sequelize.STRING
    },
    phone: {
        type: bd.Sequelize.STRING
    },
    dateBirth: {
        type: bd.Sequelize.DATE
    },
    gender: {
        type: bd.Sequelize.INTEGER
    },
});

Patient.searchAllPatients = async function (){
    return await this.findAll();
}       

Patient.searchProfilePatient = async function (req){
    return await this.findOne({
        where: { userPatientId: req.user.id }
   })
}
Patient.searchAllPatientsUsers = async function(){
    return await this.findAll({
        include: [{
            model: User, as: 'userPatient'
        }]
    })
}

Patient.searchOnePatient = function(id){
    return Patient.findOne({
        where: { 'id': id },
        include: [{
            model: User, as: 'userPatient',
        },]
    })
}

Patient.insertPatientRegister = function(email, password, name, phone){
    return User.create({
            email:email,
            password:password,
            NivelPermissaoId: 4,
        }).then((user) => {
            Patient.create({
                name:name,
                phone:phone,
                userPatientId: user.id
            })
        }).catch((err) => {
            console.log(err)
        });
}

Patient.insertPatient = function(email, password, name, phone, dateBirth, gender){
    return User.create({
        email:email,
        password:password,
        NivelPermissaoId: 4,
    }).then((user) => {
        this.create({
            name:name,
            phone:phone,
            dateBirth: dateBirth,
            gender: gender,
            userPatientId: user.id
        })
    }).catch((err) => {
        console.log(err)
    });
}

Patient.deletePatient = function(id){
    return User.destroy({
        where: { 'id': id }
    })
}

Patient.updateProfilePatient = function(name, phone, dateBirth, gender, id){
    return Patient.update({
            name: name,
            phone: phone,
            dateBirth: dateBirth,
            gender: gender,
        }, { where: { 'id': id }
     }
    )
}



Patient.belongsTo(User, {as : 'userPatient', foreingKey: {name: 'fk_user_patient'},onDelete: 'cascade'});


//Patient.sync({force: true});


module.exports = Patient;