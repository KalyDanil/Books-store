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
    amount: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'CartBook',
  });
  return CartBook;
};