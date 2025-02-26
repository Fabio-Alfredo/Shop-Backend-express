const orderService = require("../services/order.service");
const responseHandler = require("../handlers/response.handler");
const OrderCodes = require("../utils/errors/errorsCodes/order.code");
const ProductCodes = require("../utils/errors/errorsCodes/product.codes");
const createHttpError = require("http-errors");

//CONTROLADOR PARA CREAR UNA NUEVA ORDEN
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

//CONTROLADOR PARA CANCELAR UNA ORDEN
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

//CONTROLADOR PARA HACER UN REEMBOLSO DE UNA ORDEN
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

//CONTROLADOR PARA OBTENER UNA ORDEN POR ID
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

//CONTROLADOR PARA OBTENER TODAS LAS ORDENES DE UN USUARIO
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
