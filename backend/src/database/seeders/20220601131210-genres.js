'use strict';

const genres = require('../dataForSeeders/genres');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Genres', [
      genres.Fiction,
      genres.NonFiction,
      genres.LightFiction,
      genres.ScienceFiction,
      genres.Fantasy,
      genres.BusinessFinance,
      genres.Politics,
      genres.TravelBooks,
      genres.Autobiography,
      genres.History,
      genres.ThrillerMystery,
      genres.Romance,
      genres.Satire,
      genres.Horror,
      genres.HealthMedicine,
      genres.ChildrenBooks,
      genres.Encyclopedia,
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Books', null, {});
  }
};
