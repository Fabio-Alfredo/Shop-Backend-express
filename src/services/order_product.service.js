const Order_productRepository = require("../repositories/order_product.repository");
const ServiceError = require("../utils/errors/service.error");
const OrderCodes = require("../utils/errors/errorsCodes/order.code");

/**
 * Servicio para crear la relacion entre una orden y sus productos
 * 
 * @param {Array<Object>} products - productos de la orden
 * @param {UUID} orderId - id de la orden
 * @param {Object} t - transaccion de la base de datos
 * @returns {Promise<Boolean>} true si todo fue exitoso
 * @throws {ServiceError} error con detalles del problema
 */
const createRelation = async (products, orderId, t) => {
  try {
    //se crea un array con los productos a guardar
    const orderProducts = products.map((product) => {
      return {
        productId: product.id,
        orderId: orderId,
        quantity: product.quantity,
      };
    });

    //se guardan los productos de la orden
    await Order_productRepository.bulkCreate(orderProducts, t);
    //se retorna los productos guardados
    return true;
  } catch (e) {
    //en caso de error se lanza una excepcion
    throw new ServiceError(
      e.message || "Internal server error while create order",
      e.code || OrderCodes.NOT_FOUND
    );
  }
};

/**
 * Servicio para buscar los productos de una orden
 * 
 * @param {UUID} orderId - id de la orden
 * @returns {Promise<Array<Object>>} productos de la orden
 * @throws {ServiceError} error con detalles
 */
const findOrder = async (orderId) => {
  try {
    //se busca la orden por id
    const orderProducts = await Order_productRepository.findByOrder(orderId);
    //si no existe se lanza una excepcion
    if (!orderProducts) {
      throw new ServiceError("Order not found", OrderCodes.NOT_FOUND);
    }

    //se retorna los productos de la orden
    return orderProducts;
  } catch (e) {
    //en caso de error se lanza una excepcion
    throw new ServiceError(
      e.message || "Internal server error while create order",
      e.code || OrderCodes.NOT_FOUND
    );
  }
};

module.exports = {
  createRelation,
  findOrder,
};
