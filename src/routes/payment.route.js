const Router = require("express").Router;
const paymentController = require("../controllers/payment.controller");

const paymentRoute = Router();

paymentRoute.post("/create", paymentController.createPayment);

module.exports = paymentRoute;
