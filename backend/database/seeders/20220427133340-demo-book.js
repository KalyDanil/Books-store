'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Books', [{
      name: 'How to stop worrying and start living',
      authorname: 'Dale Carnegie',
      price: 37.85,
      rating: 5,
      dateofissue: '11.11.20',
      cover: 'How to stop worrying and start living.svg',
      status: 'active',
      genre: 'Light fiction',
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Books', null, {});
  }
};
