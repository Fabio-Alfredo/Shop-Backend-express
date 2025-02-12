const { body } = require('express-validator');

const createValidator = [
  body('sku')
  .trim()
  .isString()
  .notEmpty()
  .withMessage('SKU product is required for register new product')
  .isLength({ min: 6, max: 10 })
  .withMessage('SKU must be beetween 6 and 10 characters')
  .matches(/^[A-Z]+-\d{3}$/)
  .withMessage("El SKU debe tener el formato LETRAS-NÚMEROS (ej. CARTO-003).")
  .bail(),

  body('name')
    .trim()
    .isString()
    .notEmpty()
    .withMessage('Name product is required')
    .isLength({ min: 3, max: 20 })
    .withMessage('Name must be between 3 and 5 characters')
    .bail(),

  body('description')
    .trim()
    .isString()
    .notEmpty()
    .withMessage('description product is required')
    .isLength({ min: 5, max: 50 })
    .withMessage('description must be between 3 and 5 characters')
    .bail(),

  body('price')
    .trim()
    .notEmpty()
    .withMessage('Price is required')
    .isFloat({ decimal_digits: '0,2' })
    .withMessage('Price must be a float with up to 2 decimal places')
    .bail(),

    body('category')
    .trim()
    .isString()
    .notEmpty()
    .withMessage('Category product is required')
    .isLength({ min: 3, max: 5 })
    .withMessage('Category must be between 3 and 5 characters')
    .bail(),

  body('variants')
  .isArray({ min: 1 }).withMessage("Products must be a non-empty array.")
  .bail(),

  body('variants.*.color')
  .trim()
  .isString()
  .notEmpty()
  .withMessage('Color is required for register variansts product')
  .bail(),

  body('variants.*.size')
  .trim()
  .isString()
  .notEmpty()
  .withMessage('Size is required for register variants product')
  .bail(),

  body('variants.*.stock')
  .notEmpty()
  .withMessage('STOCK is required for save product and variants')
  .isInt({min:0})
  .withMessage('stock must be a number')
  .bail()

  // body('stock')
  //   .trim()
  //   .notEmpty()
  //   .withMessage('Quantity is required')
  //   .isInt({ min: 0 })
  //   .withMessage('Quantity must be an integer greater than or equal to 0')
  //   .bail(),


];

module.exports = {
  createValidator,
};
