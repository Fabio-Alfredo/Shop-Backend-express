const paymentRepository = require("../repositories/ paymet.repository");
const transactionService = require("../services/transaction.service");
const orderService = require("../services/order.service");
const PaymentCodes = require("../utils/errors/errorsCodes/payment.code");
const ServiceError = require("../utils/errors/service.error");

/**
 * Servicio para crear un nuevo pago
 *
 * @param {Object} payment - datos del nuevo pago
 * @returns {Promise<Object>} pago creado
 * @throws {ServiceError} error con detalles del problema
 */
const createPayment = async (payment, user) => {
  const t = await paymentRepository.startTransaction();
  try {
    //separamos los detalles del pago
    const { paymentDetails, ...paymentData } = payment;
    //buscamos la orden a pagar

    const existOrder = await orderService.orderFindById(paymentData.orderId, t);
    //validamos que el usuario que paga sea el mismo que creo la orden
    if (existOrder.user.id !== user.id) {
      throw new ServiceError(
        "You are not authorized to pay this order",
        PaymentCodes.NOT_FOUND
      );
    }

    if (existOrder.status !== "pending" ) {
      throw new ServiceError(
        "Error, the order not is pending",
        PaymentCodes.NOT_FOUND
      );
    }
    //realizamos la transaccion
    //await transactionService.stripeTransaction(existOrder.total, paymentDetails);

    //creamos el nuevo pago
    const newPayment = await paymentRepository.create(
      {
        method: paymentData.method,
        total: existOrder.total,
        status: "paid",
      },
      t
    );
    //actualizamos el estado de la orden
    await orderService.payOrder(newPayment, existOrder, t);

    //confirmamos la transaccion
    //retornamos el nuevo pago
    await t.commit();
    return newPayment;
  } catch (e) {
    //en caso de error se hace un rollback de la transaccion
    //se lanza una excepcion
    await t.rollback();
    throw new ServiceError(
      e.message || "Internal server error while paid order",
      e.code || PaymentCodes.NOT_FOUND
    );
  }
};

/**
 * Servicio para reembolsar un pago
 *
 * @param {UUID} orderId - id de la orden
 * @param {Number} amount - cantidad a reembolsar
 * @returns {Promise<Object>} pago reembolsado
 * @throws {ServiceError} error con detalles del problema
 */
const refundPayment = async (orderId) => {
  const t = await paymentRepository.startTransaction();
  try {
    const existOrder = await orderService.orderFindById(orderId, t);

    //buscamos el pago a reembolsar por el id de la orden
    const payment = await paymentRepository.findByOrderId(orderId);
    //realizamos el reembolso
    //await transactionService.stripeRefund(payment.transactionId, existOrder.total);
    //actualizamos el estado del pago
    const refund = await paymentRepository.update(
      { status: "refunded" },
      payment.id,
      t
    );

    await orderService.refundOrder(existOrder, t);
    //confirmamos la transaccion
    //retornamos el pago reembolsado
    await t.commit();
    return refund;
  } catch (e) {
    //en caso de error se hace un rollback de la transaccion
    //se lanza una excepcion
    await t.rollback();
    throw new ServiceError(
      e.message || "Internal server error while refund order",
      e.code || PaymentCodes.NOT_FOUND
    );
  }
};

module.exports = {
  createPayment,
  refundPayment,
};
