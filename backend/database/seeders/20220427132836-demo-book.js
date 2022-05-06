'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Books', [{
      name: 'The Picture of Dorian Gray',
      authorname: 'Oscar Wilde',
      price: 20.00,
      rating: 0,
      dateofissue: '10.10.20',
      cover: 'The Picture of Dorian Gray.svg',
      status: 'active',
      genre: 'Fiction',
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Books', null, {});
  }
};
