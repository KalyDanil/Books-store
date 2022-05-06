'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    static associate(models) {
    }
  }
  Book.init({
    name: DataTypes.STRING,
    authorname: DataTypes.STRING,
    price: DataTypes.FLOAT,
    rating: DataTypes.INTEGER,
    dateofissue: DataTypes.STRING,
    cover: DataTypes.STRING,
    status: DataTypes.STRING,
    genre: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};