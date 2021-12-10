module.exports = (sequelize, DataTypes) =>{

    const User = sequelize.define("User", {
        id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        email:{
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        password:{
            type: DataTypes.STRING(100),
            allowNull: false
        },
        image: {
            type: DataTypes.STRING(500)
        },
        bio: {
            type: DataTypes.STRING(500),
        },
        role: {
            type: DataTypes.STRING(100)
        }   
    }
    )
    
    User.associate = models =>{
        User.hasMany(models.Post, {
            onDelete: "CASCADE",
            hooks:true 
        })
    }
        

    
    User.sync().then(() => {
      console.log('User table created');
    });
return User
}
