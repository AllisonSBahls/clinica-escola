var mysql = require('mysql');

var connMysql = function(){
    return connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'dbclinica'
    });
}

module.exports = function () {
    return connMysql;
}