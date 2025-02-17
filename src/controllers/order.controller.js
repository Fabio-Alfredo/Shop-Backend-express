const orderService = require("../services/order.service");
const responseHandler = require("../handlers/response.handler");
const OrderCodes = require("../utils/errors/errorsCodes/order.code");
const ProductCodes = require("../utils/errors/errorsCodes/product.codes");
const createHttpError = require("http-errors");

const createOrder = async (req, res, next) => {
  try {
    const data = req.body;
    const user = req.user;

    const order = await orderService.createOrder(data, user);
    const newOrder = await orderService.orderFindById(order.id);
    responseHandler(res, 201, "Order created", newOrder);
  } catch (e) {
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

const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await orderService.orderFindById(id);
    responseHandler(res, 200, "succes", order);
  } catch (e) {
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

const getOrdersByUser = async (req, res, next) => {
  try {
    const user = req.user;
    const orders = await orderService.findByUser(user.id);
    responseHandler(res, 200, "succes", orders);
  } catch (e) {
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
};
