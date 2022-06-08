'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../../config');
const basename = path.basename(__filename);
const db = {};
let sequelize;

if (config.database.development.use_env_variable) {
  sequelize = new Sequelize(process.env[config.database.development.use_env_variable], config.database.development);
} else {
  sequelize = new Sequelize(config.database.development.database, config.database.development.username, config.database.development.password, config.database.development);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
