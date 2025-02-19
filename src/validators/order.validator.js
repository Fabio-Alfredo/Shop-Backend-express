const { body, param } = require("express-validator");

const createOrderValidator = [
  body("direction")
    .trim()
    .isString()
    .withMessage("Direction must be a string.")
    .notEmpty()
    .withMessage("Direction is required.")
    .bail(),

  body("products")
    .isArray({ min: 1 })
    .withMessage("Products must be a non-empty array.")
    .bail(),

  body("products.*.id")
    .notEmpty()
    .withMessage("Each product must have an ID.")
    .isUUID()
    .withMessage("Product ID must be a valid UUID.")
    .bail(),

  body("products.*.quantity")
    .notEmpty()
    .withMessage("Each product must have a quantity.")
    .isInt({ min: 1 })
    .withMessage("Quantity must be an integer greater than 0.")
    .bail(),
];

const updateOrderValidator = [
  param("orderId")
    .trim()
    .notEmpty()
    .withMessage("Order ID is required.")
    .isUUID()
    .withMessage("Order ID must be a valid UUID.")
    .bail(),

  body("direction")
    .trim()
    .optional()
    .notEmpty()
    .withMessage("Direction is required.")
    .isString()
    .withMessage("Direction must be a string.")
    .bail(),

  body("products")
    .optional()
    .isArray({ min: 1 })
    .withMessage("Products must be a non-empty array.")
    .bail(),

  body("products.*.id")
    .optional()
    .notEmpty()
    .withMessage("Each product must have an ID.")
    .isUUID()
    .withMessage("Product ID must be a valid UUID.")
    .bail(),

  body("products.*.quantity")
    .optional()
    .notEmpty()
    .withMessage("Each product must have a quantity.")
    .isInt()
    .withMessage("Quantity must be an integer greater than 0.")
    .bail(),
];

const findOrderValidator = [
  param("id")
    .trim()
    .notEmpty()
    .withMessage("Id is required for realizate search")
    .isUUID()
    .withMessage("Product id must be a valid UUID"),
];

module.exports = {
  createOrderValidator,
  findOrderValidator,
  updateOrderValidator,
};
