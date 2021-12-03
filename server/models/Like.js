module.exports = (sequelize, DataTypes) => {
    const Like = sequelize.define('Like', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            },
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
           
        }
    })

    Like.associate = models => {
        
    
        Like.belongsTo(models.User);
    
        Like.belongsTo(models.Post);
      };
      
        Like.sync().then(() => {
            console.log('Like table created');
          });
      return Like
      }