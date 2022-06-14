'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Comment);
      User.belongsToMany(models.Book, { as: 'BookRatings', through: models.BookRating });
      User.belongsToMany(models.Book, { as: 'LikedBooks', through: models.LikedBook });
      User.belongsToMany(models.Book, { as: 'CartBooks', through: models.CartBook });
    }
  }
  User.init({
    fullName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      defaultValue: 'profileLink.svg',
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};