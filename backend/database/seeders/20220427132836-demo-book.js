'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Books', [{
      title: 'The Picture of Dorian Gray',
      author: 'Oscar Wilde',
      price: 20.00,
      rating: 0,
      dateOfIssue: '10.10.20',
      cover: 'The Picture of Dorian Gray.svg',
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Books', null, {});
  }
};
