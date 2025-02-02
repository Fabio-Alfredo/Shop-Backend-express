'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

  await queryInterface.bulkInsert("roles",[
    {
      id: 'CLTE',
      rol: "cliente",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'ADMIN',
      rol: "administrador",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'MODER',
      rol: "moderador",
      createdAt: new Date(),
      updatedAt: new Date()
    },

  ])
},

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("roles", null, {});
  }
};
