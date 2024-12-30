'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const { changeColumn } = await import('sequelize').then(mod => mod.queryInterface);

    await queryInterface.changeColumn('usuarios', 'email', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
  },

  async down(queryInterface, Sequelize) {
    
  }
};
