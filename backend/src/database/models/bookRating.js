'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BookRating extends Model {
    static associate(models) {
    }
  }
  BookRating.init({
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'BookRating',
  });
  return BookRating;
};