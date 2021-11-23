const Sequelize = require('sequelize');
const sequelize = require('../database/connection')



module.exports = sequelize.define("Post", {
    id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    },
    content: Sequelize.STRING(500),
})