'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert ( 'Users', [
      {
      name: 'John',
      email: 'example@example.com',
      password:'123456',
      role:'user',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Maria',
      email: 'mariadb@example.com',
      password:'123456',
      role:'user',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ])

  },

  async down (queryInterface, Sequelize) {
  
  }
};
