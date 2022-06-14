'use strict';
const db = require('../models/index');
const { models } = db.sequelize;

module.exports = {
  async up(queryInterface, Sequelize) {
    const genres1 = await models.Genre.findAll({
      where: { name: ['Fiction', 'Light fiction', 'Fantasy'] }
    });

    const genres2 = await models.Genre.findAll({
      where: { name: ['Non-fiction', 'Business & Finance', 'Travel books'] }
    });

    const genres3 = await models.Genre.findAll({
      where: { name: ['Romance', 'Health / Medicine', 'Satire'] }
    });

    const genres4 = await models.Genre.findAll({
      where: { name: ['Horror', `Children's books`, 'Politics'] }
    });

    const books1 = await models.Book.findAll(
      {
        offset: 0,
        limit: 3,
      }
    );

    const books2 = await models.Book.findAll({
      offset: 3,
      limit: 3,
    });

    const books3 = await models.Book.findAll({
      offset: 6,
      limit: 3,
    });

    const books4 = await models.Book.findAll({
      offset: 9,
      limit: 3,
    });

    for (let i = 0; i < books1.length; i++) {
      await books1[i].addGenre(genres1)
    };

    for (let i = 0; i < books2.length; i++) {
      await books2[i].addGenre(genres2)
    };

    for (let i = 0; i < books3.length; i++) {
      await books3[i].addGenre(genres3)
    };

    for (let i = 0; i < books4.length; i++) {
      await books4[i].addGenre(genres4)
    };
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('BookGenres', null, {});
  }
};
