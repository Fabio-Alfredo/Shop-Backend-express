const Router = require("express").Router;
const paymentController = require("../controllers/payment.controller");
const authMiddleware = require("../middlewares/authValidator.middleware");
const runValidator = require("../middlewares/validator.middleware");
const payValidator = require("../validators/payment.validator");

const paymentRoute = Router();

paymentRoute.post("/create", 
    authMiddleware.authValidator,
    payValidator.createPaymentValidator,
    runValidator,
    paymentController.createPayment
);

module.exports = paymentRoute;
