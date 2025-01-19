const Router = require("express").Router;
const productController = require("../controllers/product.controller");
const productValidator = require("../validators/product.validator");
const runValidator = require("../middlewares/validator.middleware");

const productRouter = Router();

productRouter.post(
  "/register",
  productValidator.createValidator,
  runValidator,
  productController.registerProduct
);

productRouter.get("/findAll", productController.findAllProducts);

module.exports = productRouter;
