module.exports = (sequelize, DataTypes) => {
    const Like = sequelize.define('Like', {
        
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
        // associations can be defined here
    
        Like.belongsTo(models.User);
    
        Like.belongsTo(models.Post);
      };
      
        Like.sync().then(() => {
            console.log('Like table created');
          });
      return Like
      }