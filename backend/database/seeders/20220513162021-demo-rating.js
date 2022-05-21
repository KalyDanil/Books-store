'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('UserBooks', [{
      BookId: 49,
      UserId: 37,
      rating: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('UserBooks', null, {});
  }
};
