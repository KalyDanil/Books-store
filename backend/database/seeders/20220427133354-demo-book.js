'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Books', [{
      name: "Don't sweat the Small Stuuff",
      authorname: 'Richard Carlson',
      price: 40.00,
      rating: 5,
      dateofissue: '12.12.17',
      cover: "Don't sweat the Small Stuuff.svg",
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
