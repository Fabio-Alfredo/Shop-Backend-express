"use strict";

const { create } = require('../repositories/user.repository');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert("category", [
      {
        id: "RPA",
        category: "Ropa",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "ZAP",
        category: "Zapatos",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "ACC",
        category: "Accesorios",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("categories", null, {});
  },
};
