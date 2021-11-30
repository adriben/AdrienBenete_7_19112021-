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
    userId: Sequelize.INTEGER(11),
    username: Sequelize.STRING(100),
    image: {
      type: Sequelize.STRING(500)
  }
})

Post.associate = models => {
  Post.belongsTo(models.User, {
    foreignKey: {
      allowNull: false
    }
  })
}

Post.sync().then(() => {
  console.log('Post table created');
});
module.exports = Post;