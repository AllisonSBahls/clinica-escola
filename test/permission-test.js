const chai = require('chai');
const Permission = require('../app/model/Permissoes');

describe('Permissao', function () {
});
it('should list ALL Permissao GET', function (done) {
    Permission.findAll()
        .then((permission) => {
            done();
        })
})

// it('should add a SINGLE permissao on /Register POST', function (done) {
//     Permission.create({
//         permissao: 'Recepcionista',
//     })
//         .then((permission) => {
//             done();
//         })
// })

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
//         })
// })
