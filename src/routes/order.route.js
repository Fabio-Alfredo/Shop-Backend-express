const Router = require("express").Router;
const orderController = require("../controllers/order.controller");
const authMiddleware = require("../middlewares/authValidator.middleware");
const orderValidator = require("../validators/order.validator");
const runValidator = require("../middlewares/validator.middleware");

//crea una instancia de Router
const orderRouter = Router();

/**
 * @route POST /order/create
 * @desc Crea una nueva orden
 * @access Private (User)
 * @middleware
 * -authMiddleware.authValidator: Valida el token de acceso del usuario
 * -orderValidator.createOrderValidator: Valida los campos de entrada de la orden
 * -runValidator: Ejecuta la validación y maneja errores en caso de datos inválidos.
 * @controller
 * -orderController.createOrder: Crea una nueva orden
 */
orderRouter.post(
  "/create",
  authMiddleware.authValidator,
  orderValidator.createOrderValidator,
  runValidator,
  orderController.createOrder
);

/**
 * @route PUT /order/cancel/:id
 * @desc Cancela una orden
 * @access Private (User)
 * @middleware
 * -authMiddleware.authValidator: Valida el token de acceso del usuario
 * -orderValidator.findOrderValidator: Valida  los campos de entrada de la orden
 * -runValidator: Ejecuta la validación y maneja errores en caso de datos inválidos.
 * @controller
 * -orderController.cancelOrder: Cancela una orden
 */
orderRouter.put(
  "/cancel/:id",
  authMiddleware.authValidator,
  orderValidator.findOrderValidator,
  runValidator,
  orderController.cancelOrder
);

/**
 * @route GET /order/findUser
 * @desc Obtiene todas las ordenes de un usuario
 * @access Private (User)
 * @middleware
 * -authMiddleware.authValidator: Valida el token de acceso del usuario
 * @controller
 * -orderController.getOrdersByUser: Obtiene todas las ordenes de un usuario
 */
orderRouter.get(
  "/findUser",
  authMiddleware.authValidator,
  orderController.getOrdersByUser
);

/**
 * @route GET /order/findId/:id
 * @desc Obtiene una orden por id
 * @access Private (User)
 * @middleware
 * -authMiddleware.authValidator: Valida el token de acceso del usuario
 * -orderValidator.findOrderValidator: Valida  los campos de entrada de la orden
 * -runValidator: Ejecuta la validación y maneja errores en caso de datos inválidos.
 * @controller
 * -orderController.getOrderById: Obtiene una orden por id
 */
orderRouter.get(
  "/findId/:id",
  authMiddleware.authValidator,
  authMiddleware.roleValidator(["ADMIN"]),
  orderValidator.findOrderValidator,
  runValidator,
  orderController.getOrderById
);

module.exports = orderRouter;
