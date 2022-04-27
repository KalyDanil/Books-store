'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Books', [{
      title: 'The Two towers',
      author: 'J. R. R. Tolkien',
      price: 25.00,
      rating: 5,
      dateOfIssue: '01.06.22',
      cover: 'The Two towers.svg',
      status: 'not available',
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Books', null, {});
  }
};
