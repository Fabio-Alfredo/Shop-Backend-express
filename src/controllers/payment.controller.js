const createHttpError = require("http-errors");
const PaymentCodes = require("../utils/errorsCodes/payment.code");
const paymentService = require("../services/payment.service");

const createPayment = async (req, res, next) => {
  try {
    const payment = req.body;
    const newPayment = paymentService.createPayment(payment);
    res.status(200).json(newPayment);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createPayment,
};
