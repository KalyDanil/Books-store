'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('Books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      authorname: {
        type: Sequelize.STRING
      },
      description1: {
        type: Sequelize.TEXT
      },
      description2: {
        type: Sequelize.TEXT
      },
      description3: {
        type: Sequelize.TEXT
      },
      paperBackPrice: {
        type: Sequelize.FLOAT
      },
      price: {
        type: Sequelize.FLOAT
      },
      dateofissue: {
        type: Sequelize.STRING
      },
      cover: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Books');
  }
};
