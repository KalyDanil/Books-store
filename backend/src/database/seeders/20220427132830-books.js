'use strict';

const books = require('../dataForSeeders/books');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Books', [
      books.ThePsychologyOfMoney,
      books.ThePictureOfDorianGray,
      books.TheSubtleArtOfNotGivingAFuck,
      books.TheTwoTowers,
      books.BookOfFairyTales,
      books.HowToStopWorrying,
      books.DontSweatTheSmallStuuff,
      books.TheWeightOfThings,
      books.MilkAndHoney,
      books.MobyDick,
      books.TheCryingBook,
      books.TheChroniclesOfNarnia
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Books', null, {});
  }
};
