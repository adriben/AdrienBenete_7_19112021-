const Sequelize = require('sequelize');
require('dotenv').config()





const sequelize = new Sequelize('socialnetwork', 'root', 'mysqlwebdopenclassroom17', { host: 'localhost', dialect: 'mysql'})

module.exports = sequelize;
global.sequelize = sequelize;