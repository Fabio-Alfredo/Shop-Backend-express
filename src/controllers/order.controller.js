const orderService = require("../services/order.service");
const responseHandler = require("../handlers/response.handler");
const OrderCodes = require("../utils/errors/errorsCodes/order.code");
const ProductCodes = require("../utils/errors/errorsCodes/product.codes");
const createHttpError = require("http-errors");

/**
 * Controlador para crear una orden
 *
 * @param {object} req - datos de la orden a crear y usuario que la crea
 * @param {object} res - respuesta con la orden creada
 * @param {object} next - middleware para manejar errores
 * @returns {object} respuesta con la orden creada
 */
const createOrder = async (req, res, next) => {
  try {
    //se obtiene la data de la orden
    //se obtiene el usuario que esta creando la orden
    const data = req.body;
    const user = req.user;

    //se crea la orden
    const order = await orderService.createOrder(data, user);
    //se busca la orden creada
    const newOrder = await orderService.orderFindById(order.id);
    //se retorna la orden creada
    return responseHandler(res, 201, "Order created", newOrder);
  } catch (e) {
    //en caso de error se lanza una excepcion adecuada al error
    switch (e.code) {
      case OrderCodes.NOT_FOUND:
        next(createHttpError(404, e.message));
        break;
      case ProductCodes.NOT_FOUND:
        next(createHttpError(404, e.message));
        break;
      case ProductCodes.OUT_OF_STOCK:
        next(createHttpError(400, e.message));
        break;
      case OrderCodes.INVALID_ORDER:
        next(createHttpError(400, e.message));
        break;
      default:
        next(e);
    }
  }
};

/**
 * Controlador para cancelar una orden
 *
 * @param {object} req - id de la orden a cancelar
 * @param {object} res - respuesta con la orden cancelada
 * @param {object} next - middleware para manejar errores
 * @returns {object} respuesta con la orden cancelada
 */
const cancelOrder = async (req, res, next) => {
  try {
    //se obtiene el id de la orden a cancelar
    const { id } = req.params;
    //se cancela la orden
    await orderService.cancelOrder(id);
    //se busca la orden cancelada
    const order = await orderService.orderFindById(id);
    //se retorna la orden cancelada
    return responseHandler(res, 200, "Order canceled", order);
  } catch (e) {
    //en caso de error se lanza una excepcion adecuada al error
    switch (e.code) {
      case OrderCodes.NOT_FOUND:
        next(createHttpError(404, e.message));
        break;
      case OrderCodes.INVALID_ORDER:
        next(createHttpError(400, e.message));
        break;
      default:
        next(e);
    }
  }
};

/**
 * Controlador para reembolsar una orden
 * 
 * @param {object} req - id de la orden a reembolsar
 * @param {object} res - respuesta con la orden reembolsada
 * @param {object} next - middleware para manejar errores
 * @returns {object} respuesta con la orden reembolsada
 */
const refundOrder = async (req, res, next) => {
  try {
    //se obtiene el id de la orden a reembolsar
    const { id } = req.params;
    //se reembolsa la orden
    await orderService.refundOrder(id);
    //se busca la orden reembolsada
    const order = await orderService.orderFindById(id);
    //se retorna la orden reembolsada
    return responseHandler(res, 200, "Order refunded", order);
  } catch (e) {
    //en caso de error se lanza una excepcion adecuada al error
    switch (e.code) {
      case OrderCodes.NOT_FOUND:
        next(createHttpError(404, e.message));
        break;
      case OrderCodes.INVALID_ORDER:
        next(createHttpError(400, e.message));
        break;
      default:
        next(e);
    }
  }
};

/**
 * Controlador para obtener una orden por id
 * 
 * @param {object} req - id de la orden a buscar
 * @param {object} res - respuesta con la orden encontrada
 * @param {object} next - middleware para manejar errores
 * @returns {object} respuesta con la orden encontrada
 */
const getOrderById = async (req, res, next) => {
  try {
    //se obtiene el id de la orden a buscar
    const { id } = req.params;
    //se busca la orden por id
    const order = await orderService.orderFindById(id);
    //se retorna la orden
    return responseHandler(res, 200, "succes", order);
  } catch (e) {
    //en caso de error se lanza una excepcion adecuada al error
    switch (e.code) {
      case OrderCodes.NOT_FOUND:
        next(createHttpError(404, e.message));
        break;
      case OrderCodes.INVALID_ORDER:
        next(createHttpError(400, e.message));
        break;
      default:
        next(e);
    }
  }
};

/**
 * Controlador para obtener las ordenes de un usuario
 * 
 * @param {object} req - usuario que busca las ordenes
 * @param {object} res - respuesta con las ordenes encontradas
 * @param {object} next - middleware para manejar errores
 * @returns {object} respuesta con las ordenes encontradas
 */
const getOrdersByUser = async (req, res, next) => {
  try {
    //se obtiene el usuario que esta buscando las ordenes
    const user = req.user;
    //se buscan las ordenes por usuario
    const orders = await orderService.findByUser(user.id);
    //se retornan las ordenes
    return responseHandler(res, 200, "succes", orders);
  } catch (e) {
    //en caso de error se lanza una excepcion adecuada al error
    switch (e.code) {
      case OrderCodes.NOT_FOUND:
        next(createHttpError(404, e.message));
        break;
      default:
        next(e);
    }
  }
};

module.exports = {
  createOrder,
  getOrderById,
  getOrdersByUser,
  cancelOrder,
  refundOrder,
};
