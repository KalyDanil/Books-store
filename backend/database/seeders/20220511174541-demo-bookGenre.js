'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('BookGenres', [{
      BookId: 50,
      GenreId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('BookGenres', null, {});
  }
};
