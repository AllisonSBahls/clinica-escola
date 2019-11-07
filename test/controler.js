const chai = require('chai');

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

const newSupervisor = {
    name: "Supervisor",
    email: "supervisor@gmail.com",
    password: "teste"
}

cookie = {};
beforeEach(function (done) {
    request.post('/login')
        .send(userMaster)
        .end(function (err, res) {
            cookie = res.headers['set-cookie'];
            done();
        });
});

describe('No controlador Supervisores', function () {

    describe('Usuário Não Logado', function () {
        it('Deve ir para pagina não encontrada ao fazer GET /supervisor', function (done) {
            request.get('/supervisor').end(function (err, res) {
                res.headers.location.should.eql('/pagenotfound');
                done();
            });
        });

        it('Deve ir para pagina não encontrada  ao fazer GET /supervisor/profile/1', function (done) {
            request.get('/supervisor/profile/1').end(function (err, res) {
                res.headers.location.should.eql('/pagenotfound');
                done();
            });

        })
        it('deve ir para pagina não encontrada ao fazer GET /supervisor/register', function (done) {
            request.get('/supervisor/register').end(function (err, res) {
                res.headers.location.should.eql('/pagenotfound');
                done();
            });
        });
        it('deve ir para pagina não encontrada ao fazer POST /supervisor/save', function (done) {
            request.post('/supervisor/save').end(function (err, res) {
                res.headers.location.should.eql('/pagenotfound');
                done();
            });
        });

        it('deve ir para pagina não encontrada ao fazer DELETE /supervisor/delete/1', function (done) {
            request.get('/supervisor/delete/1').end(function (err, res) {
                res.headers.location.should.eql('/pagenotfound');
                done();
            });
        });
        it('deve ir para pagina não encontrada ao fazer PUT /supervisor/update/1', function (done) {
            request.post('/supervisor/update/1').end(function (err, res) {
                res.headers.location.should.eql('/pagenotfound');
                done();
            });
        });

    });




    describe('Usuario Logado', function () {

        it('deve retornar status 200 em GET /supervisor', function (done) {
            var req = request.get('/supervisor');
            req.cookies = cookie;
            req.end(function (err, res) {
                res.status.should.eql(200);
                done();
            });
        });

        it('deve retornar status 200 em GET /supervisor', function (done) {
            var req = request.get('/supervisor');
            req.cookies = cookie;
            req.end(function (err, res) {
                res.status.should.eql(200);
                done();
            });
        });

        it('deve ir para rota /supervisor em POST /supervisor/save', function (done) {
            var req = request.post('/supervisor/save');
            req.cookies = cookie;
            req.send(newSupervisor).end(function (err, res) {
                res.headers.location.should.eql('/supervisor');
                done();
            });
        });
    });
})