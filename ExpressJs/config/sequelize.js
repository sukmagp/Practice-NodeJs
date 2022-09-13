const {Sequelize} = require('sequelize');

const sequelize = new Sequelize({
    database: 'crud_eduwork_v2',
    host: 'localhost',
    username: 'root',
    password: '',
    dialect: 'mysql'
});

// Checking connection
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        } catch (error) {
        console.error('Unable to connect to the database:', error);
        }
})();

module.exports = sequelize;