
module.exports = (sequelize, DataTypes) => {

    const Comment = sequelize.define('Comment',{
      id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      },
      content: DataTypes.STRING(500),
      userId: DataTypes.INTEGER(11),
    
  })
  
  Comment.associate = models =>{
      Comment.belongsTo(models.User)
      Comment.belongsTo(models.Post, {
        onDelete: "cascade"
    })
  }
  
  
  Comment.sync().then(() => {
    console.log('Comment table created');
  });
  
  return Comment
  }
  