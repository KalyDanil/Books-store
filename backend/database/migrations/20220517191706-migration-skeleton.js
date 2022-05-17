'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'Books', 
      'rating',
    );
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Books', 
      'rating',
      {
        type: Sequelize.INTEGER,
      }
    );
  }
};
