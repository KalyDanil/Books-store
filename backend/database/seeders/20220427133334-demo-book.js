'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Books', [{
      name: 'Book of Fairy Tales',
      authorname: 'Angela Carter',
      price: 32.00,
      rating: 5,
      dateofissue: '02.04.21',
      cover: 'Book of Fairy Tales.svg',
      status: 'active',
      genre: 'Romance',
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Books', null, {});
  }
};
