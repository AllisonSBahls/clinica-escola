// Conectando com o banco de dados utilizando o 

const Sequelize = require('sequelize');
const sequelize = new Sequelize('dbclinica', 'root', 'PQZMAL@2121997', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = {
    sequelize: sequelize,
    Sequelize: Sequelize
}

