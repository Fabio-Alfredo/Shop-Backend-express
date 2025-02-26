const { param, body } = require("express-validator");

const createPaymentValidator = [
  body("method")
    .trim()
    .isString()
    .withMessage("Method must be a string.")
    .notEmpty()
    .withMessage("Method is required.")
    .bail(),

  body("orderId")
    .trim()
    .notEmpty()
    .withMessage("Id is required for realizate search")
    .isUUID()
    .withMessage("Product id must be a valid UUID"),

  body("description")
    .trim()
    .isString()
    .withMessage("Description must be a string.")
    .notEmpty()
    .withMessage("Description is required.")
    .bail(),

  body("paymentDetails")
    .isObject()
    .withMessage("Payment details must be an object.")
    .notEmpty()
    .withMessage("Payment details is required.")
    .bail(),

  body("paymentDetails.token")
    .trim()
    .isString()
    .withMessage("Token must be a string.")
    .notEmpty()
    .withMessage("Token is required.")
    .bail(),

  body("paymentDetails.email")
    .trim()
    .isString()
    .isEmail()
    .withMessage("Email must be a string.")
    .bail(),
];

module.exports = {
  createPaymentValidator,
};
