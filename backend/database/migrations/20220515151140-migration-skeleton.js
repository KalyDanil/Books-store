'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'UserBooks',
      {
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        rating: {
          type: Sequelize.INTEGER,
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        },
        inCart: {
          type: Sequelize.BOOLEAN,
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
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
        }
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('UserBooks');
  },
};
