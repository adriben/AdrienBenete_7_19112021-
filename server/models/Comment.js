const Sequelize = require('sequelize');
const db = require('../database/connection')



const Comment = db.define('Comment',{
    id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    },
    content: Sequelize.STRING(500),
})


Comment.sync().then(() => {
  console.log('Comment table created');
});

module.exports = Comment;