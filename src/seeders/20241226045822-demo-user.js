"use strict";
const bcrypt = require('bcryptjs');
const config = require('../configs/config').development;

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
    await queryInterface.bulkInsert("users", [
      {
        id: 1,
        name: "Admin User",
        email: "admin@example.com",
        password: await bcrypt.hash("password123", parseInt(config.salt)),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: "John Doe",
        email: "johndoe@example.com",
        password: await bcrypt.hash("password123", parseInt(config.salt)),
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
    await queryInterface.bulkDelete("users", null, {});
  },
};
