const { body, param } = require("express-validator");

const createRoleValidator = [
  body("id")
    .trim()
    .notEmpty()
    .withMessage("Role ID is required.")
    .isString()
    .withMessage("Role ID must be a string.")
    .bail(),

  body("name")
    .trim()
    .notEmpty()
    .withMessage("Role name is required.")
    .isString()
    .withMessage("Role name must be a string.")
    .bail(),
];

module.exports = {
  createRoleValidator,
};
