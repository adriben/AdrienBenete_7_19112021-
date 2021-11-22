const Sequelize = require('sequelize');

const sequelize = new Sequelize("socialnetwork", 'root', '', { host: 'localhost', dialect: 'mysql'})

module.exports = sequelize;
global.sequelize = sequelize;