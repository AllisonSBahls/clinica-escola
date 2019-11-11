
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


