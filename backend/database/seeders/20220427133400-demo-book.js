'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Books', [{
      name: 'Milk and honey',
      authorname: 'Rupi Kaur',
      description1: '“Rupi Kaur is the Writer of the Decade.” - The New Republic ',
      description2: '#1 New York Times bestseller milk and honey is a collection of poetry and prose about survival. About the experience of violence, abuse, love, loss, and femininity.',
      description3: 'The book is divided into four chapters, and each chapter serves a different purpose. Deals with a different pain. Heals a different heartache. milk and honey takes readers through a journey of the most bitter moments in life and finds sweetness in them because there is sweetness everywhere if you are just willing to look.',
      paperBackPrice: 55.99,
      hardCoverPrice: 55.99,
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
