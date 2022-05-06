'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Books', [{
      name: 'The Crying book',
      authorname: 'Heather Christle',
      price: 70.00,
      rating: 3,
      dateofissue: '10.10.19',
      cover: 'The Crying book.svg',
      status: 'active',
      genre: 'Thriller / Mystery',
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Books', null, {});
  }
};
