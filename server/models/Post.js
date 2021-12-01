
module.exports = (sequelize, DataTypes) => {

  const Post = sequelize.define('Post',{
    id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    },
    content: DataTypes.STRING(500),
    userId: DataTypes.INTEGER(11),
    username: DataTypes.STRING(100),
    image: {
      type: DataTypes.STRING(500)
  },
  like:{
    type: DataTypes.INTEGER(11),
    allowNull: false,
    defaultValue: 0
  }
})

Post.associate = models =>{
    Post.belongsTo(models.User)
}


Post.sync().then(() => {
  console.log('Post table created');
});

return Post
}

