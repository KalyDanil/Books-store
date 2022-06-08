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
      Book.belongsToMany(models.User, { as: 'CartBooks', through: models.CartBook });
    }
  }
  Book.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    authorname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    paperBackPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    dateofissue: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    cover: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};