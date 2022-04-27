'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Books', [{
      title: 'The Psychlogy of Money',
      author: 'Morgan Housel',
      price: 15.00,
      rating: 4,
      dateOfIssue: '11.10.19',
      cover: 'The Psychlogy of Money.svg',
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Books', null, {});
  }
};
