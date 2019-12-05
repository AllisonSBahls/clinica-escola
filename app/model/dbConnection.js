// Conectando com o banco de dados utilizando o 

const Sequelize = require('sequelize');
// const sequelize = new Sequelize('dbclinica', 'allison', '$uportE99', {
//     host: '127.0.0.1',
//     dialect: 'mysql',
//     logging: false
const sequelize = new Sequelize('heroku_04bfb01fc69c8d8', 'b4ea5601e08112', '887571de', {
    host: 'us-cdbr-iron-east-05.cleardb.net',
    dialect: 'mysql',
    logging: false
});



module.exports = {
    sequelize: sequelize,
    Sequelize: Sequelize
}

