'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'Users', 
      'avatar'
    );
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Users', 
      'avatar',
      {
        type: Sequelize.STRING
      }
    );
  }
};
