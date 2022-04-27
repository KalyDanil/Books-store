'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Books', [{
      title: "Don't sweat the Small Stuuff",
      author: 'Richard Carlson',
      price: 40.00,
      rating: 5,
      dateOfIssue: '12.12.17',
      cover: "Don't sweat the Small Stuuff.svg",
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Books', null, {});
  }
};
