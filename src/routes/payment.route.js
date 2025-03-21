const Router = require("express").Router;
const paymentController = require("../controllers/payment.controller");
const authMiddleware = require("../middlewares/authValidator.middleware");
const runValidator = require("../middlewares/validator.middleware");
const payValidator = require("../validators/payment.validator");

//crea una instancia de Router
const paymentRoute = Router();

/**
 * @route POST /payment/create
 * @desc Crea un nuevo pago
 * @access Private (User)
 * @middleware
 * -authMiddleware.authValidator: Valida el token de acceso del usuario
 * -payValidator.createPaymentValidator: Valida los campos de entrada del pago
 * -runValidator: Ejecuta la validación y maneja errores en caso de datos inválidos.
 * @controller
 * -paymentController.createPayment: Crea un nuevo pago
 */
paymentRoute.post(
  "/create",
  authMiddleware.authValidator,
  payValidator.createPaymentValidator,
  runValidator,
  paymentController.createPayment
);

/**
 * @route PUT /payment/refund/:id
 * @desc Acepta la devolución de una orden
 * @access Private (Admin)
 * @middleware
 * -authMiddleware.authValidator: Valida el token de acceso del usuario
 * -authMiddleware.roleValidator: Valida si el usuario tiene el rol de ADMIN
 * -orderValidator.findOrderValidator: Valida  los campos de entrada de la orden
 * -runValidator: Ejecuta la validación y maneja errores en caso de datos inválidos.
 * @controller
 * -orderController.refundOrder: Acepta la devolución de una orden
 */
paymentRoute.put(
  "/refund/:id",
  authMiddleware.authValidator,
  authMiddleware.roleValidator(["ADMIN"]),
  // orderValidator.findOrderValidator,
  runValidator,
  paymentController.refoundPayment
);

module.exports = paymentRoute;
