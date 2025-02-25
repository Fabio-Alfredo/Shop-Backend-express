const stripe = require("../configs/stripe.config");
const TransactionCodes = require("../utils/errors/errorsCodes/transaction.codes");
const ServiceError = require("../utils/errors/service.error");

//FUNCION PARA REALIZAR UNA TRANSACCION CON STR
const stripeTransaction = async (total, paymentDetails) => {
  try {
    //se crea un intento de pago con los detalles proporcionados
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total * 100,
      currency: "usd",
      payment_method: paymentDetails.token,
      receipt_email: paymentDetails.email,
      confirm: true,
    });

    //se retorna el intento de pago si todo fue exitoso
    return paymentIntent;
  } catch (e) {
    //si ocurre un error se lanza una excepcion
    throw new ServiceError(
      e.message || "Internal server error while transacction ",
      e.code || TransactionCodes.NOT_FOUND
    );
  }
};

//FUNCION PARA REALIZAR UN REEMBOLSO CON STRIPE
const stripeRefund = async (paymentIntentId, amount = null) => {
  try {
    //se crea un objeto con los parametros para el reembolso
    const refundParams = { payment_intent: paymentIntentId };

    // Si amount es proporcionado, significa que se quiere un reembolso parcial
    if (amount) {
      refundParams.amount = amount * 100;
    }

    //se crea el reembolso
    const refund = await stripe.refunds.create(refundParams);

    //se retorna el reembolso si todo fue exitoso
    return refund;
  } catch (e) {
    //si ocurre un error se lanza una excepcion
    throw new ServiceError(
      e.message || "Internal server error while processing refund",
      e.code || TransactionCodes.NOT_FOUND
    );
  }
};

module.exports = {
  stripeTransaction,
  stripeRefund,
};
