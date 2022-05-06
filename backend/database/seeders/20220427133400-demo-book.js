'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Books', [{
      name: 'Milk and honey',
      authorname: 'Rupi Kaur',
      price: 55.99,
      rating: 5,
      dateofissue: '10.10.19',
      cover: 'Milk and honey.svg',
      status: 'active',
      genre: 'Encyclopedia',
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Books', null, {});
  }
};
