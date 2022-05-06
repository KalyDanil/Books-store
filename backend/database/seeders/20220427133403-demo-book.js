'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Books', [{
      name: 'Moby Dick',
      authorname: 'Herman Melville',
      price: 60.00,
      rating: 5,
      dateofissue: '04.08.22',
      cover: 'Moby Dick.svg',
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
