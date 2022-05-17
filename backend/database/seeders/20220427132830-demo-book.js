'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Books', [{
      name: 'The Psychology of Money',
      authorname: 'Morgan Housel',
      description1: '“Rupi Kaur is the Writer of the Decade.” - The New Republic ',
      description2: '#1 New York Times bestseller milk and honey is a collection of poetry and prose about survival. About the experience of violence, abuse, love, loss, and femininity.',
      description3: 'The book is divided into four chapters, and each chapter serves a different purpose. Deals with a different pain. Heals a different heartache. milk and honey takes readers through a journey of the most bitter moments in life and finds sweetness in them because there is sweetness everywhere if you are just willing to look.',
      paperBackPrice: 15.00,
      hardCoverPrice: 15.00,
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
