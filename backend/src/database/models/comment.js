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
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    commentator: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      defaultValue: 'profileLink.svg',
    },
    createdAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};