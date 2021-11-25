'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

   return queryInterface.createTable("comment", {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      },
      content: Sequelize.STRING(500),
      userId: Sequelize.INTEGER(11),
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,

   })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('comment')
  }
};
