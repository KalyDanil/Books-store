'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartBook extends Model {
    static associate(models) {
    }
  }
  CartBook.init({
    amount: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'CartBook',
  });
  return CartBook;
};