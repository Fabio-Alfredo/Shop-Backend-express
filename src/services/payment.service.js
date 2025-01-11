const paymentRepository = require("../repositories/ paymet.repository");
const transactionService = require("../services/transaction.service");
const orderService = require("../services/order.service");
const PaymentCodes = require("../utils/errorsCodes/payment.code");
const ServiceError = require("../errors/service.error");

const createPayment = async (payment) => {
  try {
    //realizar el cobro
    const { paymentDetails, ...paymentData } = payment;

    //await transactionService.stripeTransaction(paymentDetails);
    const newPayment = await paymentRepository.create(paymentData);
    await orderService.payOrder(newPayment, paymentDetails.orderId);

    return newPayment;
  } catch (e) {
    throw new ServiceError(
      e.message || "Internal server error while paid order",
      e.code || PaymentCodes.NOT_FOUND
    );
  }
};

module.exports = {
  createPayment,
};
