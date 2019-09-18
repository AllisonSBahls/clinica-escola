const chai = require('chai');
const User = require('../app/model/User');

describe('Usuarios - Test CRUD Model Sequelize', function () {
});
it('should list ALL usuario GET', function (done) {
    User.findAll()
        .then(() => {
            done();
        })
})

it('should add a SINGLE usuario on /Register POST', function (done) {
    User.create({
        email: 'allison_sousa_bahls@hotmail.com',
        password: 'Teste'
    })
        .then((user) => {
            done();
        })
})

it('should add a SINGLE usuario on /Delete GET', function (done) {

    User.destroy({
        where: { id: 8 },
    })
        .then((user) => {
            done();
        })

})
it('should get a SINGLE usuario', function (done) {
    User.findOne({
        where: { id: 7 },
    })
        .then((user) => {
            done();
        })
})

it('should update a SINGLE usuario', function (done) {
    User.update({
        User: 'allisonsousabahlas@gmail.com',
        User: '123456',
    },{
        where: {id: 7}
    })
        .then((permission) => {
            done();
        })
})
