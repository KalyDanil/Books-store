'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'UserBooks', 
      'isLiked',
      {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      }
    );
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'UserBooks', 
      'isLiked'
    );
  }
};
