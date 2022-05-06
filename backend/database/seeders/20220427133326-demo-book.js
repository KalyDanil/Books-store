'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Books', [{
      name: 'The Subtle art of not giving a fuck',
      authorname: 'Mark Manson',
      price: 23.99,
      rating: 5,
      dateofissue: '09.07.21',
      cover: 'The Subtle art of not giving a fuck.svg',
      status: 'active',
      genre: 'Health / Medicine',
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Books', null, {});
  }
};
