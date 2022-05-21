'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LikedBook extends Model {
    static associate(models) {
    }
  }
  LikedBook.init({
  }, {
    sequelize,
    modelName: 'LikedBook',
  });
  return LikedBook;
};