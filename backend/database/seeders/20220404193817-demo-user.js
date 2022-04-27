'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Books', [{
      title: 'The Chronicles of Narnia',
      author: 'C. S. Lewis',
      price: 20.00,
      rating: 5,
      dateOfIssue: '10.10.19',
      cover: 'The Chronicles of Narnia.svg',
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Books', null, {});
  }
};
