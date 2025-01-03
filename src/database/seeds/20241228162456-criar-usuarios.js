'use strict';

const bcryptjs = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {

    await queryInterface.bulkInsert('users', [
      {
       name: 'Luiz',
       email: 'luiz1@gmail.com',
       password_hash: await bcryptjs.hash('123456', 8),
       created_at: new Date(),
       updated_at: new Date(),
      },
      {
        name: 'Luiz 2',
        email: 'luiz2@gmail.com',
        password_hash: await bcryptjs.hash('654321', 8),
        created_at: new Date(),
        updated_at: new Date(),
       },
       {
        name: 'Luiz 3',
        email: 'luiz3@gmail.com',
        password_hash: await bcryptjs.hash('132456', 8),
        created_at: new Date(),
        updated_at: new Date(),
       },
    ],
    {}
  );

  },

  async down () {

  }
};
