const { body, param } = require("express-validator");

const registerValidator = [
  body("name")
    .trim()
    .isString()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3, max: 20 })
    .withMessage("Name must be between 3 and 20 characters")
    .bail(),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Email is not valid")
    .notEmpty()
    .withMessage("Email is required")
    .bail(),
  body("password")
    .isString()
    .isLength({ min: 6, max: 20 })
    .withMessage("Password must be between 6 and 20 characters")
    .notEmpty()
    .withMessage("Password is required")
    .bail(),
];

const loginValidator =[
  body("email")
  .trim()
  .isString()
  .notEmpty()
  .withMessage("Email is required"),

  body("password")
  .trim()
  .isString()
  .notEmpty()
  .withMessage("Password is required")
]

module.exports ={
    registerValidator,
    loginValidator
}