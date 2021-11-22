const Sequelize = require('sequelize');
const sequelize = require('../database/connection')


module.exports = sequelize.define("User", {
    id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    },
    username: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
    },
    password:{
        type: Sequelize.STRING(100),
        allowNull: false
    }
    
}
)