'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Books', [{
      title: 'The Crying book',
      author: 'Heather Christle',
      price: 70.00,
      rating: 3,
      dateOfIssue: '10.10.19',
      cover: 'The Crying book.svg',
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Books', null, {});
  }
};
