const Router = require("express").Router;
const orderController = require("../controllers/order.controller");
const authMiddleware = require("../middlewares/authValidator.middleware");
const orderValidator = require('../validators/order.validator');
const runValidator = require('../middlewares/validator.middleware')

const orderRouter = Router();

orderRouter.post("/create",
  authMiddleware.authValidator,
  orderValidator.createOrderValidator,
  runValidator,
  orderController.createOrder
);

orderRouter.put("/cancel/:id",
  authMiddleware.authValidator,
  orderValidator.findOrderValidator,
  runValidator,
  orderController.cancelOrder
);

orderRouter.put("/refund/:id",
  authMiddleware.authValidator,
  authMiddleware.roleValidator(["ADMIN"]),
  // orderValidator.findOrderValidator,
  // runValidator,
  orderController.refundOrder
);

orderRouter.get('/findUser',
  authMiddleware.authValidator,
  orderController.getOrdersByUser
)

orderRouter.get('/findId/:id',
  authMiddleware.authValidator,
  orderValidator.findOrderValidator,
  runValidator,
  orderController.getOrderById
)

module.exports = orderRouter;
