const mysql = require ('mysql');

const connection =mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud_eduwork_v2'
});

module.exports = connection;