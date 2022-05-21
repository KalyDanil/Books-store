'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Comment);
      User.belongsToMany(models.Book, { through: models.UserBook });
      User.belongsToMany(models.Book, { as: 'LikedBooks', through: models.LikedBook });
    }
  }
  User.init({
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    avatar: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};