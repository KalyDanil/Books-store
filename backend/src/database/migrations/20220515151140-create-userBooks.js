'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'BookRatings',
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
          allowNull: false,
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
          allowNull: false,
        },
        UserId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Users',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          allowNull: false,
        }
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('BookRatings');
  },
};
