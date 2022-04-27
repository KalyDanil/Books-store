'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Books', [{
      title: 'Milk and honey',
      author: 'Rupi Kaur',
      price: 55.99,
      rating: 5,
      dateOfIssue: '10.10.19',
      cover: 'Milk and honey.svg',
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Books', null, {});
  }
};
