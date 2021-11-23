const Sequelize = require('sequelize');
const db = require('../database/connection')



const Post = db.define('Post',{
    id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    },
    content: Sequelize.STRING(500),
})


Post.sync().then(() => {
  console.log('table created');
});
module.exports = Post;