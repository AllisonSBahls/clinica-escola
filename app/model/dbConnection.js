// Conectando com o banco de dados utilizando o SEQUELIZE
const Sequelize = require('sequelize');
const sequelize = new Sequelize('dbclinica', 'allison', '$uportE99', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = {
    sequelize: sequelize,
    Sequelize: Sequelize
}
