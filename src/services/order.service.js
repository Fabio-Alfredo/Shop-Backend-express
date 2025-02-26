const orderRepository = require("../repositories/order.repository");
const order_productService = require("../services/order_product.service");
const variantsService = require("../services/product_variants.service");
const ServiceError = require("../utils/errors/service.error");
const OrderCodes = require("../utils/errors/errorsCodes/order.code");
const {
  PAID,
  PROCESSING,
  REFUNDED,
} = require("../utils/constants/ordersState.utils");
const { MapOrder } = require("../domain/dtos/mapOrder");

/**
 * Servicio para crear una nueva orden
 *
 * @param {Object} order - datos de la nueva orden
 * @param {Object} user  - informacion del usuario autenticado que crea la orden
 * @returns {Promise<Object>} orden creada
 * @throws {ServiceError} error con detalles del problema
 */
const createOrder = async (order, user) => {
  const t = await orderRepository.startTransaction();
  try {
    //Extraemos los productos y los detalles de pago de la orden
    const { products, ...orderData } = order;

    //añadimos al usuario a la orden a crear
    orderData.userId = user.id;

    //Creamos el nuevo calculo de los stock y el costo total
    const total = await variantsService.reservationProducts(products, t);

    orderData.total = total;
    //crear la nueva orden
    const newOrder = await orderRepository.create(orderData, t);

    //creamos la relacion de la orden y los productos
    await order_productService.createRelation(products, newOrder.id, t);

    // const orderWithProducts = await orderFindById(newOrder.id, t);

    //se cofirma la transaccion
    //se retorna la orden creada
    await t.commit();
    return newOrder;
  } catch (e) {
    //en caso de error se hace rollback de la transaccion
    //se lanza una excepcion
    await t.rollback();
    throw new ServiceError(
      e.message || "Internal server error while create order",
      e.code || OrderCodes.NOT_FOUND
    );
  }
};

/**
 * Servicio para cancelar una orden
 *
 * @param {UUID} id - id de la orden
 * @returns {Promise<Boolean>} true si todo fue exitoso
 * @throws {ServiceError} error con detalles del problema
 */
const cancelOrder = async (id, user) => {
  const t = await orderRepository.startTransaction();
  try {
    //se busca la orden por id
    const order = await orderFindById(id);
    //se valida que la orden este en estado pagado
    if (order.status !== PAID)
      throw new ServiceError(
        "Estate order is invalid for cancel",
        OrderCodes.INVALID_ORDER
      );

    if (user.id !== order.user.id)
      throw new ServiceError(
        "User not authorized to cancel this order",
        OrderCodes.INVALID_ORDER
      );

    //se actualiza el estado de la orden a procesando
    await orderRepository.updateOrder(order.id, { status: PROCESSING }, t);

    //se confirma la transaccion
    //se retorna true si todo fue exit
    await t.commit();
    return true;
  } catch (e) {
    //en caso de error se hace rollback de la transaccion
    //se lanza una excepcion
    await t.rollback();
    throw new ServiceError(
      e.message || "Internal server error while cancel order",
      e.code || OrderCodes.NOT_FOUND
    );
  }
};

/**
 * Servicio para confirmar reembolso de una orden
 *
 * @param {UUID} id - id de la orden
 * @returns {Promise<Boolean>} true si todo fue exitoso
 * @throws {ServiceError} error con detalles del problema
 */
const refundOrder = async (order) => {
  const t = await orderRepository.startTransaction();
  try {
    //se valida que la orden este en estado pagado
    if (order.status !== PAID)
      throw new ServiceError(
        "Estate order is invalid for refund",
        OrderCodes.INVALID_ORDER
      );
    //se actualiza el estado de la orden a reembolsado
    await orderRepository.updateOrder(order.id, { status: REFUNDED }, t);
    //se actualiza el stock de los productos
    await variantsService.addProducts(order.products, t);

    //se confirma la transaccion
    //se retorna true si todo fue exitoso
    await t.commit();
    return true;
  } catch (e) {
    //en caso de error se hace rollback de la transaccion
    //se lanza una excepcion
    await t.rollback();
    throw new ServiceError(
      e.message || "Internal server error while refund order",
      e.code || OrderCodes.NOT_FOUND
    );
  }
};

/**
 * Servicio para buscar una orden por id
 *
 * @param {UUID} id - id de la orden
 * @returns {Promise<Object>} orden encontrada
 * @throws {ServiceError} error con detalles del problema
 */
const orderFindById = async (id, t) => {
  try {
    //se busca la orden por id
    const order = await orderRepository.findById(id, t);
    //si no existe se lanza una excepcion
    if (!order)
      throw new ServiceError("Order not exist", OrderCodes.INVALID_ORDER);

    //se mappea la orden en un dto
    //se retorna la orden si todo fue exitoso
    const mapOrder = await MapOrder(order);
    return mapOrder;
  } catch (e) {
    //si ocurre un error se lanza una excepcion
    throw new ServiceError(
      e.message || "Internal server error while find order",
      e.code || OrderCodes.NOT_FOUND
    );
  }
};

/**
 * Servicio para buscar todas las ordenes de un usuario
 *
 * @param {UUID} userId - id del usuario
 * @returns {Promise<Array<Object>>} array de ordenes
 * @throws {ServiceError} error con detalles del problema
 */
const findByUser = async (userId) => {
  try {
    //se buscan las ordenes por usuario
    const orders = await orderRepository.findByUser(userId);
    let mapOrders = [];
    //se mappean las ordenes en un dto
    for (const order of orders) {
      const mappedOrder = await MapOrder(order);
      mapOrders.push(mappedOrder);
    }
    //se retorna un array de ordenes
    return mapOrders;
  } catch (e) {
    //en caso de error se lanza una excepcion
    throw new ServiceError(
      e.message || "Internal service error while find orders",
      e.code || OrderCodes.NOT_FOUND
    );
  }
};

/**
 * Servicio para pagar una orden
 *
 * @param {Object} payment - datos del pago
 * @param {UUID} id - id de la orden
 * @param {Object} t - transaccion de la base de datos
 * @returns {Promise<Object>} orden pagada
 * @throws {ServiceError} error con detalles del problema
 */
const payOrder = async (payment, orderData, t) => {
  try {
    //se busca la orden por id
    const order = await orderRepository.findById(orderData.id, t);
    
    //se valida que la orden este en estado procesando
    await order.addPayment(payment, { transaction: t });
    

    //se actualiza el estado de la orden a pagado
    order.status = PAID;
    const saveOrder = await orderRepository.save(order, t);

    //se retorna la orden si todo fue exitoso
    return saveOrder;
  } catch (e) {
    //en caso de error se lanza una excepcion
    throw new ServiceError(
      e.message || "Internal server error while paid order",
      e.code || OrderCodes.NOT_FOUND
    );
  }
};

module.exports = {
  createOrder,
  orderFindById,
  payOrder,
  findByUser,
  cancelOrder,
  refundOrder,
};
