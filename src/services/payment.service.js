const paymentRepository = require("../repositories/ paymet.repository");
const transactionService = require("../services/transaction.service");
const orderService = require("../services/order.service");
const PaymentCodes = require("../utils/errors/errorsCodes/payment.code");
const ServiceError = require("../utils/errors/service.error");

//FUNCION PARA CREAR UN NUEVO PAGO
const createPayment = async (payment) => {
  const t = await paymentRepository.startTransaction();
  try {
    //separamos los detalles del pago
    const { paymentDetails, ...paymentData } = payment;
    //buscamos la orden a pagar
    const existOrder = await orderService.orderFindById(paymentData.orderId);
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
    await orderService.payOrder(newPayment, paymentData.orderId, t);

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

//FUNCION PARA REALIZAR UN REEMBOLSO
const refundPayment = async (orderId, amount = null) => {
  const t = await paymentRepository.startTransaction();
  try {
    //buscamos el pago a reembolsar por el id de la orden
    const payment = await paymentRepository.findByOrderId(orderId);
    //realizamos el reembolso
    //await transactionService.stripeRefund(payment.transactionId, amount);
    //actualizamos el estado del pago
    const refund = await paymentRepository.update(
      { status: "refunded" },
      payment.id,
      t
    );

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
