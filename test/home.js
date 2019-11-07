const Permission = require('../app/model/Permissoes');
const Patient = require('../app/model/Patient');
const Trainee = require('../app/model/Trainee');
const Secretary = require('../app/model/Secretary');
const Master = require('../app/model/Master');
const Reports = require('../app/model/Reports');
const Wait = require('../app/model/Wait');
const Consultation = require('../app/model/Consultations');
const User = require('../app/model/User');
const Presence = require('../app/model/Presence');
const crypto = require('../app/common/encrypt');
const Procedure = require('../app/model/Procedure')
const report = require('../app/model/Reports')
const bcrypt = require('bcryptjs');

const chai = require('chai');

var app = require('../app')
var request = require('supertest')(app);
const should = chai.should();

const userInvalid = {
    email: 'allisonbahl', 
    password: '54d321'
}

const userMaster = {
    email: 'allisonbahls@gmail.com', 
    password: '54321'
  }
  
const userPatient = {
    email: 'maria_jose@hotmail.com.br', 
    password: '12345'
}

describe('Rotas', function () {
    it('deve retornar status 200 ao fazer GET /', function (done) {
        request.get('/')
            .end(function (err, res) {
                res.status.should.eql(200);
                done();
            });
    });



    it('deve ir para rota / ao fazer GET /logout', function(done){
        request.get('/logout')
            .end(function(err, res){
                res.headers.location.should.eql('/');
                done();
        });
    });

    it('deve ir para rota /dashboard ao fazer POST /entrar', function(done){
            request.post('/login')
                .send(userMaster)
                .end(function(err, res){
                    res.headers.location.should.eql('/dashboard');
                    done();
            });
    });

    it('Deve ir para rota / ao fazer POST /entrar com usuário invalido', function(done){
            request.post('/login')
                .send(userInvalid)
                .end(function(err, res){
            res.headers.location.should.eql('/');
            done();
            });
    });

})

// var authenticatedUser = request.agent(app);

// 

// var generateHash = function (password) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
// };

// textoReport = " O incentivo ao avanço tecnológico, assim como a revolução dos costumes causa impacto indireto na reavaliação das condições financeiras e administrativas exigidas. Por outro lado, a complexidade dos estudos efetuados cumpre um papel essencial na formulação das formas de ação. A prática cotidiana prova que a expansão dos mercados mundiais exige a precisão e a definição do sistema de participação geral. No entanto, não podemos esquecer que a hegemonia do ambiente político promove a alavancagem das condições inegavelmente apropriadas. As experiências acumuladas demonstram que o comprometimento entre as equipes é uma das consequências das novas proposições."
// namePaciente = "Maria José"
// idConsult =  "1"
// dateConsult =  "2019-11-06 08:00"
// estagiario =  "1"
// master =  "1"

// describe('Criptografia dos dados', function (){
//     it('Verificando se está criptografando', function(done){
//         const reportCrypt = crypto.encryptReport(textoReport)
//         const idConsultCrypt = crypto.encryptReport(idConsult)
//         const nameCrypt = crypto.encryptReport(namePaciente)
//             if(reportCrypt == textoReport || idConsultCrypt == idConsult || namePaciente == nameCrypt){
//                 console.log('Nao Criptografado')
//                 done();
//             }else{
//                 done();
//             }
//     })

// });


// describe('GET /profile', function(done){
//     //addresses 1st bullet point: if the user is logged in we should get a 200 status code
//         it('should return a 200 response if the user is logged in', function(done){
//             authenticatedUser
//             .post('/login')
//             .send(userCredentials)
//             .end(function(err, response){
//               expect(response.statusCode).to.equal(200);
//               expect('Location', '/dashboard');
//               done();
//             });
//         });
//     });
// // describe('Criando as Tabelas', function () {

//     it('Criar Permissao', function (done) {
//         Permission.sync({ force: true }).then(() => {
//             done();
//         }).catch(done)

//     })

//     it('Criar Procedimentos', function (done) {
//         Procedure.sync({ force: true }).then(() => {
//             done();
//           });
//         });

//     it('Criar Usuario', function (done) {
//         User.sync({ force: true }).then(() => {
//             done();
//         }).catch(done)
//     })

//     it('Criar Master', function (done) {
//         Master.sync({ force: true }).then(() => {
//             done();
//         }).catch(done)
//     })

//     it('Criar Recepcionista', function (done) {
//         Secretary.sync({ force: true }).then(() => {
//             done();
//         }).catch(done)
//     })

//     it('Criar Estagiario', function (done) {
//         Trainee.sync({ force: true }).then(() => {
//             done();
//         }).catch(done)
//     })

//     it('Criar Paciente', function (done) {
//         Patient.sync({ force: true }).then(() => {
//             done();
//         }).catch(done)
//     })

//     it('Criar Consulta', function (done) {
//         Consultation.sync({ force: true }).then(() => {
//             done();
//         }).catch(done)
//     })

//     it('Criar Reports', function (done) {
//         Reports.sync({ force: true }).then(() => {
//             done();
//         }).catch(done)
//     })

//     it('Criar Espera', function (done) {
//         Wait.sync({ force: true }).then(() => {
//             done();
//         }).catch(done)
//     })

//     it('Criar Frequencias', function (done) {
//         Presence.sync({ force: true }).then(() => {
//             done();
//         }).catch(done)

//     })
// })
// describe('Verificando os cadastro no Model', function () {
//     it('should list ALL Permissao GET', function (done) {
//         Permission.findAll().then(() => {
//                 done();
//             })
//     })

//     it('Registrar a permissão de SUPERVISOR', function (done) {
//         Permission.create({
//             permissao: 'Supervisor',
//         }).then((permission) => {
//                 done();
//             })
//     })

//     it('Registrar a permissão de RECECEPCIONISTA', function (done) {
//         Permission.create({
//             permissao: 'Recepcionista',
//         }).then((permission) => {
//                 done();
//             })
//     })

//     it('Registrar a permissão de ESTAGIÁRIO', function (done) {
//         Permission.create({
//             permissao: 'Estagiario',
//         }).then((permission) => {
//                 done();
//             })
//     })

//     it('Registrar a permissão de PACIENTE', function (done) {
//         Permission.create({
//             permissao: 'Paciente',
//         })
//             .then((permission) => {
//                 done();
//             })
//     })

//     it('Registrar o procedimento', function (done) {
//         Procedure.create({
//             typeProcedure: 'Retorno',
//         }).then((procedure) => {
//                 done();
//             })
//     })

//     it('Registrar o procedimento', function (done) {
//         Procedure.create({
//             typeProcedure: 'Triagem',
//         }).then((procedure) => {
//                 done();
//             })
//     })

//     it('Registar um PACIENTE e seu Usuário', function (done) {
//         var secretaryPassword = generateHash('12345');
//         User.create({
//             email: 'maria_jose@hotmail.com.br',
//             password: secretaryPassword,
//             NivelPermissaoId: 4
//         }).then((user) => {
//             Patient.create({
//                 name: 'Maria José Antoniele',
//                 phone: '69994665965',
//                 dateBirth: '2000/06/28',
//                 gender: '1',
//                 userPatientId: user.id
//             }).then((permission) => {
//                 done();
//             })
//         })
//     })


//     it('Registar um Supervisor e seu Usuário', function (done) {
//         var secretaryPassword = generateHash('54321');
//         User.create({
//             email: 'allisonbahls@gmail.com',
//             password: secretaryPassword,
//             NivelPermissaoId: 1,
//         }).then((user) => {
//             Master.create({
//                 name: 'Allison Sousa Bahls',
//                 phone: '69999416998',
//                 userMasterId: user.id
//             }).then((permission) => {
//                 done();
//             })
//         })
//     })



//     it('Registar uma Recepcionista e seu Usuário', function (done) {
//         var secretaryPassword = generateHash('12345');
//         User.create({
//             email: 'amanda_souza@hotmail.com.br',
//             password: secretaryPassword,
//             NivelPermissaoId: 2,
//         }).then((user) => {
//             Secretary.create({
//                 name: 'Amanda Sousa Machado',
//                 phone: '69999416998',
//                 userSecretaryId: user.id
//             }).then((permission) => {
//                 done();
//             })
//         })
//     })

//     it('Registar um Estagiario e seu Usuário', function (done) {
//         var secretaryPassword = generateHash('12345');
//         User.create({
//             email: 'joao_vinicius@hotmail.com.br',
//             password: secretaryPassword,
//             NivelPermissaoId: 3,
//         }).then((user) => {
//             Trainee.create({
//                 name: 'João Vinicius',
//                 phone: '69999416998',
//                 userTraineeId: user.id
//             }).then((permission) => {
//                 done();
//             })
//         })
//     })


// });

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
