'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('UserBooks', [{
      BookId: 59,
      UserId: 50,
      rating: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('UserBooks', null, {});
  }
};
