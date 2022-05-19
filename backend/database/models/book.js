'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    static associate(models) {
      Book.hasMany(models.Comment);
      Book.belongsToMany(models.Genre, { through: 'BookGenres' });
      Book.belongsToMany(models.User, { through: models.UserBook });
      Book.belongsToMany(models.User, { as: 'UserLikedBooks', through: models.LikedBook });
    }
  }
  Book.init({
    name: DataTypes.STRING,
    authorname: DataTypes.STRING,
    description1: DataTypes.TEXT,
    description2: DataTypes.TEXT,
    description3: DataTypes.TEXT,
    paperBackPrice: DataTypes.FLOAT,
    price: DataTypes.FLOAT,
    dateofissue: DataTypes.STRING,
    cover: DataTypes.STRING,
    status: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};