const Router = require("express").Router;
const productController = require("../controllers/product.controller");

const productRouter = Router();

productRouter.post("/register", productController.registerProduct);


module.exports = productRouter;