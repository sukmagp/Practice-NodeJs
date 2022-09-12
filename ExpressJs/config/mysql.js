const mysql = require ('mysql');

const connection =mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud_eduwork'
});

module.exports = connection;