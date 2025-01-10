const { body } = require("express-validator");

const createValidator = [
  body("name")
    .trim()
    .isString()
    .notEmpty()
    .withMessage("Name product is required")
    .isLength({ min: 3, max: 20 })
    .withMessage("Name must be between 3 and 5 characters")
    .bail(),

  body("description")
    .trim()
    .isString()
    .notEmpty()
    .withMessage("description product is required")
    .isLength({ min: 5, max: 50 })
    .withMessage("description must be between 3 and 5 characters")
    .bail(),

  body("price")
    .trim()
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ decimal_digits: "0,2" })
    .withMessage("Price must be a float with up to 2 decimal places")
    .bail(),

  body("stok")
    .trim()
    .notEmpty()
    .withMessage("Quantity is required")
    .isInt({ min: 0 })
    .withMessage("Quantity must be an integer greater than or equal to 0")
    .bail(),

  body("category")
    .trim()
    .isString()
    .notEmpty()
    .withMessage("Category product is required")
    .isLength({ min: 3, max: 5 })
    .withMessage("Category must be between 3 and 5 characters")
    .bail(),
];

module.exports = {
  createValidator,
};
