'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Books', [{
      title: 'How to stop worrying and start living',
      author: 'Dale Carnegie',
      price: 37.85,
      rating: 5,
      dateOfIssue: '11.11.20',
      cover: 'How to stop worrying and start living.svg',
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Books', null, {});
  }
};
