var mysql = require('mysql');

class OP_Database{
    databaseConnection(arg, callback) {
        var dbparams = {};
        dbparams = {
            host: '150.136.179.134',
            user: 'root',
            password: 'Sql@dm1n!',
            database: 'reporting',
            port: '3306',
            multipleStatements: true
        };
        return callback(null, mysql.createConnection(dbparams));
    }
}

module.exports = OP_Database;