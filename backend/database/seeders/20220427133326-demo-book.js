'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Books', [{
      title: 'The Subtle art of not giving a fuck',
      author: 'Mark Manson',
      price: 23.99,
      rating: 5,
      dateOfIssue: '09.07.21',
      cover: 'The Subtle art of not giving a fuck.svg',
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Books', null, {});
  }
};
