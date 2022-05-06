'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Books', [{
      name: 'The Weight of Things',
      authorname: 'Marianne Flitz',
      price: 41.50,
      rating: 3,
      dateofissue: '10.03.17',
      cover: 'The Weight of Things.svg',
      status: 'active',
      genre: 'Light fiction',
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Books', null, {});
  }
};
