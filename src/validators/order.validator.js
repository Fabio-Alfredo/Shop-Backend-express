const { body, param} = require("express-validator");

const createOrderValidator = [
    body("direction")
        .trim()
        .isString().withMessage("Direction must be a string.")
        .notEmpty().withMessage("Direction is required.")
        .bail(),

    // body("total")
    //     .notEmpty().withMessage("Total is required.")
    //     .isFloat({ min: 0, decimal_digits: '0,2' }).withMessage("Total must be a positive float with up to 2 decimal places.")
    //     .bail(),

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

const findOrderValidator =[
    param('id')
    .trim()
    .notEmpty()
    .withMessage('Id is required for realizate search')
    .isUUID()
    .withMessage('Product id must be a valid UUID')
]

module.exports = {
    createOrderValidator,
    findOrderValidator
};
