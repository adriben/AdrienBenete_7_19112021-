'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

   return queryInterface.createTable("users", {
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
      password:{
          type: Sequelize.STRING(100),
          allowNull: false
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,

   })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users')
  }
};
