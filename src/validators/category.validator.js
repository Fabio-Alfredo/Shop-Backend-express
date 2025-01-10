const { body } = require("express-validator");

const createValidator = [
  body("id")
    .trim()
    .isString()
    .notEmpty()
    .withMessage("Id is required")
    .isLength({ min: 3, max: 5 })
    .withMessage("Id must be between 3 and 5 characters")
    .bail(),

  body("category")
    .trim()
    .isString()
    .notEmpty()
    .withMessage("Name Category is required")
    .bail(),
];

module.exports = {
    createValidator
}
