const stripe = require("../configs/stripe.config");
const TransactionCodes = require("../utils/errors/errorsCodes/transaction.codes");
const ServiceError = require("../utils/errors/service.error");

const stripeTransaction = async (total, paymentDetails) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total*100,
        currency:'usd',
        payment_method:paymentDetails.token,
        receipt_email:paymentDetails.email,
        confirm:true
    })

    

    return paymentIntent;
  } catch (e) {
    throw new ServiceError(
      e.message || "Internal server error while transacction ",
      e.code || TransactionCodes.NOT_FOUND
    );
  }
};

const stripeRefund = async (paymentIntentId, amount = null) => {
  try {
    const refundParams = { payment_intent: paymentIntentId };
    
    // Si amount es proporcionado, significa que se quiere un reembolso parcial
    if (amount) {
      refundParams.amount = amount * 100; 
    }

    const refund = await stripe.refunds.create(refundParams);

    return refund;
  } catch (e) {
    throw new ServiceError(
      e.message || "Internal server error while processing refund",
      e.code || TransactionCodes.NOT_FOUND
    );
  }
};



module.exports = {
    stripeTransaction,
    stripeRefund
}