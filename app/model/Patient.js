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

Patient.insertPatientRegister = function(email, password, name, phone){
    return User.create({
            email:email,
            password:password,
            NivelPermissaoId: 4,
        }).then((user) => {
            this.create({
                name:name,
                phone:phone,
                userPatientId: user.id
            })
        }).catch((err) => {
            console.log(err)
        });
}


Patient.belongsTo(User, {as : 'userPatient', foreingKey: {name: 'fk_user_patient'}});


//Patient.sync({force: true});


module.exports = Patient;