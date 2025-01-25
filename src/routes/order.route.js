const Router = require("express").Router;
const orderController = require("../controllers/order.controller");
const authMiddleware = require("../middlewares/authValidator.middleware");

const orderRouter = Router();

orderRouter.post("/create",
  authMiddleware.authValidator,
  orderController.createOrder);

module.exports = orderRouter;
