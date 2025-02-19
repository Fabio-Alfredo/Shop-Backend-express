const createHttpError = require("http-errors");
const PaymentCodes = require("../utils/errors/errorsCodes/payment.code");
const paymentService = require("../services/payment.service");
const OrderCodes = require("../utils/errors/errorsCodes/order.code");
const responseHandler = require('../handlers/response.handler');

const createPayment = async (req, res, next) => {
  try {
    const payment = req.body;
    const newPayment = await paymentService.createPayment(payment);
    responseHandler(res, 201,'succes', newPayment);
  } catch (e) {
    switch (e.code) {
      case OrderCodes.INVALID_ORDER:
        return next(createHttpError(404, e.message));
      case OrderCodes.NOT_FOUND:
        return next(createHttpError(404, e.message));
      case PaymentCodes.NOT_FOUND:
        return next(createHttpError(404, e.message));
      default:
        next(e);
    }
  }
};

module.exports = {
  createPayment,
};
