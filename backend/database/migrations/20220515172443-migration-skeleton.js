'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      BookId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Books', 
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', 
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      comment: {
        type: Sequelize.TEXT
      },
      commentator: {
        type: Sequelize.STRING
      },
      avatar: {
        type: Sequelize.STRING,
        defaultValue: 'profileLink.svg',
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Comments');
  }
};
