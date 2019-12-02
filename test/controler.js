<<<<<<< HEAD
const chai = require('chai');
const crypt = require('../app/common/encrypt');

var app = require('../app')
// var should = require('should')
var request = require('supertest')(app);
const should = chai.should();

const userMaster = {
    email: 'allisonbahls@gmail.com',
    password: '54321'
}

const userPatient = {
    email: 'maria_jose@hotmail.com.br',
    password: '12345'
}


const userTrainee = {
    email: 'joao_vinicius@hotmail.com.br',
    password: '12345'
}

cookieTrainee = {};
beforeEach(function (done) {
    request.post('/login')
        .send(userTrainee)
        .end(function (err, res) {
            cookieTrainee = res.headers['set-cookie'];
            done();
        });
});

cookiePatient = {};

cookieMaster = {};
beforeEach(function (done) {
    request.post('/login')
        .send(userMaster)
        .end(function (err, res) {
            cookieMaster = res.headers['set-cookie'];
            done();
        });
});

beforeEach(function (done) {
    request.post('/login')
        .send(userPatient)
        .end(function (err, res) {
            cookiePatient = res.headers['set-cookie'];
            done();
        });
});


describe('No controlador Supervisores', function () {

    // describe('Usuário Não Logado', function () {
    //     it('Deve ir para pagina não encontrada ao fazer GET /supervisor', function (done) {
    //         request.get('/supervisor').end(function (err, res) {
    //             res.headers.location.should.eql('/pagenotfound');
    //             done();
    //         });
    //     });

    //     it('Deve ir para pagina não encontrada  ao fazer GET /supervisor/profile/1', function (done) {
    //         request.get('/supervisor/profile/1').end(function (err, res) {
    //             res.headers.location.should.eql('/pagenotfound');
    //             done();
    //         });

    //     })
    //     it('deve ir para pagina não encontrada ao fazer GET /supervisor/register', function (done) {
    //         request.get('/supervisor/register').end(function (err, res) {
    //             res.headers.location.should.eql('/pagenotfound');
    //             done();
    //         });
    //     });
    //     it('deve ir para pagina não encontrada ao fazer POST /supervisor/save', function (done) {
    //         request.post('/supervisor/save').end(function (err, res) {
    //             res.headers.location.should.eql('/pagenotfound');
    //             done();
    //         });
    //     });

    //     it('deve ir para pagina não encontrada ao fazer DELETE /supervisor/delete/1', function (done) {
    //         request.get('/supervisor/delete/1').end(function (err, res) {
    //             res.headers.location.should.eql('/pagenotfound');
    //             done();
    //         });
    //     });
    //     it('deve ir para pagina não encontrada ao fazer PUT /supervisor/update/1', function (done) {
    //         request.post('/supervisor/update/1').end(function (err, res) {
    //             res.headers.location.should.eql('/pagenotfound');
    //             done();
    //         });
    //     });

    // });




    describe('Usuario Logado', function () {

        it('Deve retornar status 200 em GET /supervisor', function (done) {
            var req = request.get('/supervisor');
            req.cookies = cookieMaster;
            req.end(function (err, res) {
                res.status.should.eql(200);
                done();
            });
        });

        // it('Deve retornar status 200 em GET /supervisor', function (done) {
        //     var req = request.get('/supervisor');
        //     req.cookies = cookie;
        //     req.end(function (err, res) {
        //         res.status.should.eql(200);
        //         done();
        //     });
        // });

        it('Deve ir para rota /supervisor depois de encontrar em GET /supervisor/profile/id', function (done) {
            var req = request.get('/supervisor/profile/1');
            req.cookies = cookieMaster;
            req.end(function (err, res) {
                res.status.should.eql(200);
                done();
            })
        });
        it('Deve ir para rota /supervisor depois de salvar em POST /supervisor/save', function (done) {
           
        const newSupervisor = {
            name: "Supervisor",
            email: "supervisor@hotmail.com",
            password: "teste",
            phone: "69999416998"
        }

            var req = request.post('/supervisor/save');
            req.cookies = cookieMaster ;
            req.send(newSupervisor).end(function (err, res) {
                res.headers.location.should.eql('/supervisor');
                done();
            });
        });

        it('Deve ir para rota /supervisor depois de deletar em GET /supervisor/delete/id', function (done) {
            var req = request.get('/supervisor/delete/12');
            req.cookies = cookieMaster;
            req.end(function (err, res) {
                res.headers.location.should.eql('/supervisor');
                done();
            });
        })

    });

    describe('Permissão do usuario Logado não autorizado', function () {
        it('Deve retornar status 302 em GET /supervisor', function (done) {
            var req = request.get('/supervisor');
            req.cookies = cookiePatient;
            req.end(function (err, res) {
                res.status.should.eql(302);
                done();
            });
        });

        it('Deve retornar status 302 em Post /consultation/save', function (done) {
            const consulta = {
                dateStart: '2019-11-08 00:00:00',
                consultPatientId: 1,
                consultTraineeId: 1,
                consultSecretaryId: 1,
                consultMasterId: null,
                color: '#0000',
                description: 'description',
                typeProcedureId: 1,
            }
            var req = request.get('/supervisor');
            req.cookies = cookiePatient;
            req.send(consulta).end(function (err, res) {
                res.status.should.eql(302);
                done();
            });
        });

    });
describe('Criptografando os dados', function (done) {
    let newRelatorio = {
        /**Descrição do Relatório */
        report: "Texto que será criptografado na base de dados",
        /**Nome do Paciente */
        namePatient: "João Marcelo",
        /**Número da consulta */
        IdConsult: 1,
        /**Data da Consulta */
        dateConsult: "2019-11-27 11:00:00",
        /**Supervisor destinado a receber a consulta */
        reportMasterId: 1,

    }


    it('Deve ir para /relatorios se os dados foram inseridos criptografados', function (done) {
        let req = request.post('/relatorios/save');
            req.cookies = cookieTrainee;
            req.send(newRelatorio).end(function (err, res) {
               res.headers.location.should.eql('/relatorios');
                done();
            });
    });

    // it('Deve retornar os dados descriptografados', function (done) {
    //     var encriptar = "texto para ser criptografado"
    //     var encriptografado = crypt.encryptReport(encriptar)
    //     var descriptografar = crypt.decryptReport(encriptografado)
    //     descriptografar.should.eql('texto para ser criptografado');
    //     done();
    // });
    });
});
=======
// const chai = require('chai');
// const crypt = require('../app/common/encrypt');

// var app = require('../app')
// // var should = require('should')
// var request = require('supertest')(app);
// const should = chai.should();

// const userMaster = {
//     email: 'allisonbahls@gmail.com',
//     password: '54321'
// }

// const userPatient = {
//     email: 'maria_jose@hotmail.com.br',
//     password: '12345'
// }


// const userTrainee = {
//     email: 'joao_vinicius@hotmail.com.br',
//     password: '12345'
// }

// cookieTrainee = {};
// beforeEach(function (done) {
//     request.post('/login')
//         .send(userTrainee)
//         .end(function (err, res) {
//             cookieTrainee = res.headers['set-cookie'];
//             done();
//         });
// });

// cookiePatient = {};

// cookieMaster = {};
// beforeEach(function (done) {
//     request.post('/login')
//         .send(userMaster)
//         .end(function (err, res) {
//             cookieMaster = res.headers['set-cookie'];
//             done();
//         });
// });

// beforeEach(function (done) {
//     request.post('/login')
//         .send(userPatient)
//         .end(function (err, res) {
//             cookiePatient = res.headers['set-cookie'];
//             done();
//         });
// });


// describe('No controlador Supervisores', function () {

//     // describe('Usuário Não Logado', function () {
//     //     it('Deve ir para pagina não encontrada ao fazer GET /supervisor', function (done) {
//     //         request.get('/supervisor').end(function (err, res) {
//     //             res.headers.location.should.eql('/pagenotfound');
//     //             done();
//     //         });
//     //     });

//     //     it('Deve ir para pagina não encontrada  ao fazer GET /supervisor/profile/1', function (done) {
//     //         request.get('/supervisor/profile/1').end(function (err, res) {
//     //             res.headers.location.should.eql('/pagenotfound');
//     //             done();
//     //         });

//     //     })
//     //     it('deve ir para pagina não encontrada ao fazer GET /supervisor/register', function (done) {
//     //         request.get('/supervisor/register').end(function (err, res) {
//     //             res.headers.location.should.eql('/pagenotfound');
//     //             done();
//     //         });
//     //     });
//     //     it('deve ir para pagina não encontrada ao fazer POST /supervisor/save', function (done) {
//     //         request.post('/supervisor/save').end(function (err, res) {
//     //             res.headers.location.should.eql('/pagenotfound');
//     //             done();
//     //         });
//     //     });

//     //     it('deve ir para pagina não encontrada ao fazer DELETE /supervisor/delete/1', function (done) {
//     //         request.get('/supervisor/delete/1').end(function (err, res) {
//     //             res.headers.location.should.eql('/pagenotfound');
//     //             done();
//     //         });
//     //     });
//     //     it('deve ir para pagina não encontrada ao fazer PUT /supervisor/update/1', function (done) {
//     //         request.post('/supervisor/update/1').end(function (err, res) {
//     //             res.headers.location.should.eql('/pagenotfound');
//     //             done();
//     //         });
//     //     });

//     // });




//     describe('Usuario Logado', function () {

//         it('Deve retornar status 200 em GET /supervisor', function (done) {
//             var req = request.get('/supervisor');
//             req.cookies = cookieMaster;
//             req.end(function (err, res) {
//                 res.status.should.eql(200);
//                 done();
//             });
//         });

//         // it('Deve retornar status 200 em GET /supervisor', function (done) {
//         //     var req = request.get('/supervisor');
//         //     req.cookies = cookie;
//         //     req.end(function (err, res) {
//         //         res.status.should.eql(200);
//         //         done();
//         //     });
//         // });

//         it('Deve ir para rota /supervisor depois de encontrar em GET /supervisor/profile/id', function (done) {
//             var req = request.get('/supervisor/profile/1');
//             req.cookies = cookieMaster;
//             req.end(function (err, res) {
//                 res.status.should.eql(200);
//                 done();
//             })
//         });
//         it('Deve ir para rota /supervisor depois de salvar em POST /supervisor/save', function (done) {
           
//         const newSupervisor = {
//             name: "Supervisor",
//             email: "supervisor@hotmail.com",
//             password: "teste",
//             phone: "69999416998"
//         }

//             var req = request.post('/supervisor/save');
//             req.cookies = cookieMaster ;
//             req.send(newSupervisor).end(function (err, res) {
//                 res.headers.location.should.eql('/supervisor');
//                 done();
//             });
//         });

//         it('Deve ir para rota /supervisor depois de deletar em GET /supervisor/delete/id', function (done) {
//             var req = request.get('/supervisor/delete/12');
//             req.cookies = cookieMaster;
//             req.end(function (err, res) {
//                 res.headers.location.should.eql('/supervisor');
//                 done();
//             });
//         })

//     });

//     describe('Permissão do usuario Logado não autorizado', function () {
//         it('Deve retornar status 302 em GET /supervisor', function (done) {
//             var req = request.get('/supervisor');
//             req.cookies = cookiePatient;
//             req.end(function (err, res) {
//                 res.status.should.eql(302);
//                 done();
//             });
//         });

//         it('Deve retornar status 302 em Post /consultation/save', function (done) {
//             const consulta = {
//                 dateStart: '2019-11-08 00:00:00',
//                 consultPatientId: 1,
//                 consultTraineeId: 1,
//                 consultSecretaryId: 1,
//                 consultMasterId: null,
//                 color: '#0000',
//                 description: 'description',
//                 typeProcedureId: 1,
//             }
//             var req = request.get('/supervisor');
//             req.cookies = cookiePatient;
//             req.send(consulta).end(function (err, res) {
//                 res.status.should.eql(302);
//                 done();
//             });
//         });

//     });
// describe('Criptografando os dados', function (done) {
//     let newRelatorio = {
//         /**Descrição do Relatório */
//         report: "Texto que será criptografado na base de dados",
//         /**Nome do Paciente */
//         namePatient: "João Marcelo",
//         /**Número da consulta */
//         IdConsult: 1,
//         /**Data da Consulta */
//         dateConsult: "2019-11-27 11:00:00",
//         /**Supervisor destinado a receber a consulta */
//         reportMasterId: 1,

//     }


//     it('Deve ir para /relatorios se os dados foram inseridos criptografados', function (done) {
//         let req = request.post('/relatorios/save');
//             req.cookies = cookieTrainee;
//             req.send(newRelatorio).end(function (err, res) {
//                res.headers.location.should.eql('/relatorios');
//                 done();
//             });
//     });

//     // it('Deve retornar os dados descriptografados', function (done) {
//     //     var encriptar = "texto para ser criptografado"
//     //     var encriptografado = crypt.encryptReport(encriptar)
//     //     var descriptografar = crypt.decryptReport(encriptografado)
//     //     descriptografar.should.eql('texto para ser criptografado');
//     //     done();
//     // });
//     });
// });
>>>>>>> 46d5df152bd4a637d231d31fb5bba4538c681a10
