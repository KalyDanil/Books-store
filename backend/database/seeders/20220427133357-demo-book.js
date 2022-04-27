'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Books', [{
      title: 'The Weight of Things',
      author: 'Marianne Flitz',
      price: 41.50,
      rating: 3,
      dateOfIssue: '10.03.17',
      cover: 'The Weight of Things.svg',
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Books', null, {});
  }
};
