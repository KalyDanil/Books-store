'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('Books', 'selectStatus', {
          type: Sequelize.DataTypes.BOOLEAN
        }, { transaction: t }),
      ]);
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('Books', 'selectStatus', {
          type: Sequelize.DataTypes.BOOLEAN
        }, { transaction: t }),
      ]);
    });
  }
};
