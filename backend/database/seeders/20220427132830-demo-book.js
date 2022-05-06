'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Books', [{
      name: 'The Psychlogy of Money',
      authorname: 'Morgan Housel',
      price: 15.00,
      rating: 4,
      dateofissue: '11.10.19',
      cover: 'The Psychlogy of Money.svg',
      status: 'active',
      genre: 'Business & Finance',
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Books', null, {});
  }
};
