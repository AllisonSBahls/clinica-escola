const bd = require('./dbConnection');
const User = require("./User");
const { Op } = require('sequelize')

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
    schooling:{
        type: bd.Sequelize.INTEGER

    },
    address:{
        type: bd.Sequelize.STRING

    },
    number: {
        type: bd.Sequelize.INTEGER
    },
    district: {
        type: bd.Sequelize.STRING
    },
    maritalstatus: {
        type: bd.Sequelize.INTEGER
    },
    spouse: {
        type: bd.Sequelize.STRING
    },
    cep: {
        type: bd.Sequelize.STRING
    },
    country: {
        type: bd.Sequelize.STRING
    },
    UF: {
        type: bd.Sequelize.STRING
    },

});
Patient.belongsTo(User, {as : 'userPatient', foreingKey: {name: 'fk_user_patient'},onDelete: 'cascade'});

Patient.searchAllPatients = async function (){
    return await this.findAll();
}       

Patient.searchProfilePatientAuth = async function (id){
    return await this.findOne({
        where: { userPatientId: id }
   })
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
            statusUser: true,
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

Patient.searchPatientName = function(name){
    return Patient.findAll({
        where: { 
            name:{
                [Op.like]: name,
            }  
        },
        include: [{
            model: User, as: 'userPatient'
        }]
    })
}


Patient.findPatientAuth = async function(googleID){
    return await User.findAll({
        where: {googleID: googleID}
    })
}

Patient.insertPatientAuth = function(name, userId){
    return Patient.create({
        name:name,
        userPatientId: userId
    })
}


Patient.insertPatient = function(email, password, name, phone, dateBirth, gender, address, district, number, schooling, spouse, maritalstatus, country, uf, cep){
    return User.create({
        email:email,
        password:password,
        NivelPermissaoId: 4,
    }).then((user) => {
        this.create({
            name:name,
            phone:phone,
            dateBirth:dateBirth,
            gender:gender,
            address:address,
            district:district,
            number:number,
            schooling:schooling,
            spouse:spouse,
            maritalstatus:maritalstatus,
            country:country,
            cep:cep,
            UF:uf,
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

Patient.updateProfilePatient = function(name, phone, dateBirth, gender, id, address, district, number, schooling, spouse, maritalstatus, country, uf, cep){
    return Patient.update({
            name: name,
            phone: phone,
            dateBirth: dateBirth,
            gender: gender,
            address:address,
            district:district,
            number:number,
            schooling:schooling,
            spouse:spouse,
            maritalstatus:maritalstatus,
            country:country,
            cep:cep,
            UF:uf,
        }, 
        { where: { id: id }
     }
    )
}





//Patient.sync({force: true});


module.exports = Patient;