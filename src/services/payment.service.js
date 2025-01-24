const paymentRepository = require("../repositories/ paymet.repository");
const transactionService = require("../services/transaction.service");
const orderService = require("../services/order.service");
const PaymentCodes = require("../utils/errors/errorsCodes/payment.code");
const ServiceError = require("../utils/errors/service.error");

const createPayment = async (payment) => {
  const t = await paymentRepository.startTransaction();
  try {
    const { paymentDetails, ...paymentData } = payment;

    //await transactionService.stripeTransaction(paymentDetails);

    const newPayment = await paymentRepository.create({
      method: paymentData.method,
      t
    });
    await orderService.payOrder(newPayment, paymentData.orderId, t);

    await t.commit();
    return newPayment;
  } catch (e) {
    await  t.rollback();
    throw new ServiceError(
      e.message || "Internal server error while paid order",
      e.code || PaymentCodes.NOT_FOUND
    );
  }
};

module.exports = {
  createPayment,
};
