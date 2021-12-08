module.exports = (sequelize, DataTypes) => {
    const Notification = sequelize.define('Notification', {
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
           
        },
        senderUsername: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    Notification.associate = models => {
        
    
        Notification.belongsTo(models.User);
      };
      
        Notification.sync().then(() => {
            console.log('Notification table created');
          });
      return Notification
      }