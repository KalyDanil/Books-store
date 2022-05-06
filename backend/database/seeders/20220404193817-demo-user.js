'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Books', [{
      name: 'The Chronicles of Narnia',
      authorname: 'C. S. Lewis',
      price: 20.00,
      rating: 5,
      dateofissue: '10.10.19',
      cover: 'The Chronicles of Narnia.svg',
      status: 'active',
      genre: 'Fiction',
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Books', null, {});
  }
};
