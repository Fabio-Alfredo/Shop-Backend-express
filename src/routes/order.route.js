const Router = require("express").Router;
const orderController = require("../controllers/order.controller");

const orderRouter = Router();

orderRouter.post("/create", orderController.createOrder);

module.exports = orderRouter;
