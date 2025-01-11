const paymentRepository = require("../repositories/ paymet.repository");
const transactionService = require("../services/transaction.service");
const orderService = require("../services/order.service");

const createPayment = async (payment) => {
  try {
    //realizar el cobro
    const { paymentDetails, ...paymentData } = payment;

    //await transactionService.stripeTransaction(paymentDetails);
    const newPayment = await paymentRepository.create(paymentData);
    await orderService.payOrder(newPayment, paymentDetails.orderId);

    return newPayment;
  } catch (e) {
    throw new Error("se dio un pedillo");
  }
};

module.exports = {
  createPayment,
};
