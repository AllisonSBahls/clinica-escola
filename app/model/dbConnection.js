// Conectando com o banco de dados utilizando o 

const Sequelize = require('sequelize');
<<<<<<< HEAD
const sequelize = new Sequelize('dbclinica', 'root', 'PQZMAL@2121997', {
    host: 'localhost',
=======
const sequelize = new Sequelize('heroku_04bfb01fc69c8d8', 'b4ea5601e08112', '887571de', {
    host: 'us-cdbr-iron-east-05.cleardb.net',
>>>>>>> 46d5df152bd4a637d231d31fb5bba4538c681a10
    dialect: 'mysql',
    logging: false
});



module.exports = {
    sequelize: sequelize,
    Sequelize: Sequelize
}

