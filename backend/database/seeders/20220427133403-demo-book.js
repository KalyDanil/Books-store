'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Books', [{
      title: 'Moby Dick',
      author: 'Herman Melville',
      price: 60.00,
      rating: 5,
      dateOfIssue: '04.08.22',
      cover: 'Moby Dick.svg',
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Books', null, {});
  }
};
