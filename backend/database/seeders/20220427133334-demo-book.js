'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Books', [{
      title: 'Angela Carter',
      author: 'Angela Carter',
      price: 32.00,
      rating: 5,
      dateOfIssue: '02.04.21',
      cover: 'Angela Carter.svg',
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Books', null, {});
  }
};
