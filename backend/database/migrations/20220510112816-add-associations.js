'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Comments', 
      'BookId', 
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Books', 
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'Comments', 
      'BookId',
    );
  }
};
