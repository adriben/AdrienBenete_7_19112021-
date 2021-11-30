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
    email:{
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
    },
    password:{
        type: Sequelize.STRING(100),
        allowNull: false
    },
    image: {
        type: Sequelize.STRING(500)
    }
    
}
)
User.associate = models => {
    User.hasMany(models.Post, {
        onDelete: "cascade"
    })
}
User.sync().then(() => {
  console.log('User table created');
});
module.exports = User;