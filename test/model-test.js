const Permission = require('../app/model/Permissoes');
const Patient = require('../app/model/Patient');
const Trainee = require('../app/model/Trainee');
const Secretary = require('../app/model/Secretary');
const Master = require('../app/model/Master');
const Consultation = require('../app/model/Consultations');
const User = require('../app/model/User');
const bcrypt = require('bcryptjs');

var generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

describe('Criando as Tabelas', function () {
    it('Criar Permissao', async function (done) {
        await Permission.sync({ force: true }).then(() => {
            done();
        })

    })
    it('Criar Usuario', async function (done) {
        await User.sync({ force: true }).then(() => {
            done();
        })
    })
    it('Criar Master', async function (done) {
        await Master.sync({ force: true }).then(() => {
            done();
        })
    })
    it('Criar Recepcionista', async function (done) {
        await Secretary.sync({ force: true }).then(() => {
            done();
        })
    })
    it('Criar Estagiario', async function (done) {
        await Trainee.sync({ force: true }).then(() => {
            done();
        })
    })
    it('Criar Paciente', async function (done) {
        await Patient.sync({ force: true }).then(() => {
            done();
        })
    })
    it('Criar Consulta', async function (done) {
        await Consultation.sync({ force: true }).then(() => {
            done();
        })
    })
})
describe('Verificando os cadastro no Model', function () {
    it('should list ALL Permissao GET', function (done) {
        Permission.findAll()
            .then((permission) => {
                done();
            })
    })

    it('Registrar a permissão de SUPERVISOR', function (done) {
        Permission.create({
            permissao: 'Supervisor',
        })
            .then((permission) => {
                done();
            })
    })

    it('Registrar a permissão de RECECEPCIONISTA', function (done) {
        Permission.create({
            permissao: 'Recepcionista',
        })
            .then((permission) => {
                done();
            })
    })

    it('Registrar a permissão de ESTAGIÁRIO', function (done) {
        Permission.create({
            permissao: 'Estagiario',
        })
            .then((permission) => {
                done();
            })
    })

    it('Registrar a permissão de PACIENTE', function (done) {
        Permission.create({
            permissao: 'Paciente',
        })
            .then((permission) => {
                done();
            })
    })

    it('Registar um PACIENTE e seu Usuário', function (done) {
        var secretaryPassword = generateHash('12345');
        User.create({
            email: 'maria_jose@hotmail.com.br',
            password: secretaryPassword,
            NivelPermissaoId: 4
        }).then((user) => {
            Patient.create({
                name: 'Maria José Antoniele',
                phone: '69994665965',
                dateBirth: '2000/06/28',
                gender: '1',
                userPatientId: user.id
            }).then((permission) => {
                done();
            })
        })
    })


    it('Registar um Supervisor e seu Usuário', function (done) {
        var secretaryPassword = generateHash('54321');
        User.create({
            email: 'allisonbahls@gmail.com',
            password: secretaryPassword,
            NivelPermissaoId: 1,
        }).then((user) => {
            Master.create({
                name: 'Allison Sousa Bahls',
                phone: '69999416998',
                userMasterId: user.id
            }).then((permission) => {
                done();
            })
        })
    })



    it('Registar uma Recepcionista e seu Usuário', function (done) {
        var secretaryPassword = generateHash('12345');
        User.create({
            email: 'amanda_souza@hotmail.com.br',
            password: secretaryPassword,
            NivelPermissaoId: 2,
        }).then((user) => {
            Secretary.create({
                name: 'Amanda Sousa Machado',
                phone: '69999416998',
                userSecretaryId: user.id
            }).then((permission) => {
                done();
            })
        })
    })

    it('Registar um Estagiario e seu Usuário', function (done) {
        var secretaryPassword = generateHash('12345');
        User.create({
            email: 'joao_vinicius@hotmail.com.br',
            password: secretaryPassword,
            NivelPermissaoId: 3,
        }).then((user) => {
            Trainee.create({
                name: 'João Vinicius',
                phone: '69999416998',
                userTraineeId: user.id
            }).then((permission) => {
                done();
            })
        })
    })


});

// it('should add a SINGLE permissao on /Delete GET', function (done) {

//     Permission.destroy({
//         where: { id: 8 },
//     })
//         .then((permission) => {
//             done();
//         })

// })
// it('should get a SINGLE permissao', function (done) {
//     Permission.findOne({
//         where: { id: 7 },
//     })
//         .then((permission) => {
//             done();
//         })
// })

// it('should update a SINGLE permissao', function (done) {
//     Permission.update({
//         permissao: 'Supervisor',
//     },{
//         where: {id: 7}
//     })
//         .then((permission) => {
//             done();
// 
