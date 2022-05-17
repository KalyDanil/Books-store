'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('Books', 'description1', {
          type: Sequelize.DataTypes.TEXT
        }, { transaction: t }),
        queryInterface.addColumn('Books', 'description2', {
          type: Sequelize.DataTypes.TEXT,
        }, { transaction: t }),
        queryInterface.addColumn('Books', 'description3', {
          type: Sequelize.DataTypes.TEXT,
        }, { transaction: t }),
        queryInterface.addColumn('Books', 'paperBackPrice', {
          type: Sequelize.DataTypes.FLOAT,
        }, { transaction: t }),
        queryInterface.addColumn('Books', 'hardCoverPrice', {
          type: Sequelize.DataTypes.FLOAT,
        }, { transaction: t }),
        queryInterface.removeColumn('Books', 'price', { transaction: t }),
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('Books', 'description1', {
          type: Sequelize.DataTypes.STRING
        }, { transaction: t }),
        queryInterface.removeColumn('Books', 'description2', {
          type: Sequelize.DataTypes.STRING,
        }, { transaction: t }),
        queryInterface.removeColumn('Books', 'description3', {
          type: Sequelize.DataTypes.STRING,
        }, { transaction: t }),
        queryInterface.removeColumn('Books', 'paperBackPrice', {
          type: Sequelize.DataTypes.FLOAT,
        }, { transaction: t }),
        queryInterface.removeColumn('Books', 'hardCoverPrice', {
          type: Sequelize.DataTypes.FLOAT,
        }, { transaction: t }),
        queryInterface.addColumn('Books', 'price', { transaction: t }),
      ]);
    });
  }
};
