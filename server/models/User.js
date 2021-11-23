const Sequelize = require('sequelize');
const db = require('../database/connection')


const User = db.define("User", {
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
User.sync().then(() => {
  console.log('table created');
});
module.exports = User;