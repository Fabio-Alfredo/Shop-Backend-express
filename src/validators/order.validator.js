const { body } = require("express-validator");

const createOrderValidator = [
    body("direction")
        .trim()
        .isString().withMessage("Direction must be a string.")
        .notEmpty().withMessage("Direction is required.")
        .bail(),

    body("total")
        .notEmpty().withMessage("Total is required.")
        .isFloat({ min: 0, decimal_digits: '0,2' }).withMessage("Total must be a positive float with up to 2 decimal places.")
        .bail(),

    body("products")
        .isArray({ min: 1 }).withMessage("Products must be a non-empty array.")
        .bail(),

    body("products.*.id")
        .notEmpty().withMessage("Each product must have an ID.")
        .isUUID().withMessage("Product ID must be a valid UUID.")
        .bail(),
    body("products.*.quantity")
        .notEmpty().withMessage("Each product must have a quantity.")
        .isInt({ min: 1 }).withMessage("Quantity must be an integer greater than 0.")
        .bail(),

];

module.exports = {
    createOrderValidator,
};
