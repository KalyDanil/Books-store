'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'UserBooks', 
      'isLiked',
    );
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'UserBooks', 
      'isLiked',
      {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      }
    );
  }
};
