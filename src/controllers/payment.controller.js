const createHttpError = require("http-errors");
const PaymentCodes = require("../utils/errors/errorsCodes/payment.code");
const paymentService = require("../services/payment.service");
const OrderCodes = require("../utils/errors/errorsCodes/order.code");
const responseHandler = require('../handlers/response.handler');

//CONTROLADOR PARA CREAR UNA NUEVA ORDEN
const createPayment = async (req, res, next) => {
  try {
    //se obtiene la data del pago
    const payment = req.body;
    //se genera el pago
    const newPayment = await paymentService.createPayment(payment);
    //se retorna el pago creado
    return responseHandler(res, 201,'succes', newPayment);
  } catch (e) {
    //en caso de error se lanza una excepcion adecuada al error
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
