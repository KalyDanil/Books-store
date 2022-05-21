'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserBook extends Model {
    static associate(models) {
    }
  }
  UserBook.init({
    rating: DataTypes.INTEGER,
    inCart: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'UserBook',
  });
  return UserBook;
};