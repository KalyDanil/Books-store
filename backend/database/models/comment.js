'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      Comment.belongsTo(models.User);
    }
  }
  Comment.init({
    comment: DataTypes.TEXT,
    commentator: DataTypes.STRING,
    avatar: DataTypes.STRING,
    createdAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};