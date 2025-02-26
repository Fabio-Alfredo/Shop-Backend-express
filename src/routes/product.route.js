const Router = require("express").Router;
const productController = require("../controllers/product.controller");
const productValidator = require("../validators/product.validator");
const runValidator = require("../middlewares/validator.middleware");
const autValidator = require("../middlewares/authValidator.middleware");

const productRouter = Router();

productRouter.post(
  "/register",
  autValidator.authValidator,
  autValidator.roleValidator(["ADMIN"]),
  productValidator.createValidator,
  runValidator,
  productController.registerProduct
);

productRouter.put(
  "/addStock",
  autValidator.authValidator,
  autValidator.roleValidator(["ADMIN"]),
  productValidator.addStockValidator,
  runValidator,
  productController.addProducts
);

productRouter.put(
  "/update/:id",
  autValidator.authValidator,
  autValidator.roleValidator(["ADMIN"]),
  productValidator.updateValidator,
  runValidator,
  productController.updateDataProduct
);

productRouter.delete(
  "/delete/:id",
  autValidator.authValidator,
  autValidator.roleValidator(["ADMIN"]),
  productValidator.idValidator,
  runValidator,
  productController.deleteProduct
);

productRouter.get("/findAll", productController.findAllProducts);

productRouter.get(
  "/findId/:id",
  productValidator.idValidator,
  runValidator,
  productController.findProductById
);

module.exports = productRouter;
