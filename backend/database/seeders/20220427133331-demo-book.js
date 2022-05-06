'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Books', [{
      name: 'The Two towers',
      authorname: 'J. R. R. Tolkien',
      price: 25.00,
      rating: 5,
      dateofissue: '01.06.22',
      cover: 'The Two towers.svg',
      status: 'notAvailable ',
      genre: 'Fantasy',
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Books', null, {});
  }
};
