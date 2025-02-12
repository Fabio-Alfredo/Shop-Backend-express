const Router = require("express").Router;
const productController = require("../controllers/product.controller");
const productValidator = require("../validators/product.validator");
const runValidator = require("../middlewares/validator.middleware");
const autValidator = require('../middlewares/authValidator.middleware')

const productRouter = Router();

productRouter.post(
  "/register",
  productValidator.createValidator,
  runValidator,
  autValidator.authValidator,
  autValidator.roleValidator(['ADMIN']),
  productController.registerProduct
);

productRouter.get("/findAll", productController.findAllProducts);
productRouter.get("/findId/:id", productController.findProductById);


module.exports = productRouter;
