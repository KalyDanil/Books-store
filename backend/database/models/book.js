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
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    price: DataTypes.FLOAT,
    rating: DataTypes.INTEGER,
    dateOfIssue: DataTypes.STRING,
    cover: DataTypes.STRING,
    status: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};