// Conectando com o banco de dados utilizando o 

const Sequelize = require('sequelize');
const sequelize = new Sequelize('dbclinica', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging:false
});

module.exports = {
    sequelize: sequelize,
    Sequelize: Sequelize
}

