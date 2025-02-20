const orderRepository = require("../repositories/order.repository");
const order_productService = require("../services/order_product.service");
const paymentService = require("../services/payment.service");
const variantsService = require("../services/product_variants.service");
const ServiceError = require("../utils/errors/service.error");
const OrderCodes = require("../utils/errors/errorsCodes/order.code");

const {
  PAID,
  PROCESSING,
  REFUNDED,
} = require("../utils/constants/ordersState.utils");
const { MapOrder } = require("../utils/helpers/mapOrder");

const createOrder = async (order, user) => {
  const t = await orderRepository.startTransaction();
  try {
    const { products, paymentDetails, ...orderData } = order;

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

    await t.commit();
    return newOrder;
  } catch (e) {
    await t.rollback();
    throw new ServiceError(
      e.message || "Internal server error while create order",
      e.code || OrderCodes.NOT_FOUND
    );
  }
};

const cancelOrder = async (id) => {
  const t = await orderRepository.startTransaction();
  try {
    const order = await orderFindById(id);
    if (order.status !== PAID)
      throw new ServiceError(
        "Estate order is invalid for cancel",
        OrderCodes.INVALID_ORDER
      );

    await orderRepository.updateOrder(order.id, { status: PROCESSING }, t);

    await t.commit();
    return true;
  } catch (e) {
    await t.rollback();
    throw new ServiceError(
      e.message || "Internal server error while cancel order",
      e.code || OrderCodes.NOT_FOUND
    );
  }
};

const refundOrder = async (id) => {
  const t = await orderRepository.startTransaction();
  try {
    const order = await orderFindById(id);
    if (order.status !== PAID)
      throw new ServiceError(
        "Estate order is invalid for refund",
        OrderCodes.INVALID_ORDER
      );
    await paymentService.refundPayment(order.id);
    await orderRepository.updateOrder(order.id, { status: REFUNDED }, t);
    await variantsService.addProducts(order.products, t);

    await t.commit();
    return true;
  } catch (e) {
    await t.rollback();
    throw new ServiceError(
      e.message || "Internal server error while refund order",
      e.code || OrderCodes.NOT_FOUND
    );
  }
}

const orderFindById = async (id, t) => {
  try {
    const order = await orderRepository.findById(id, t);
    if (!order)
      throw new ServiceError("Order not exist", OrderCodes.INVALID_ORDER);

    const mapOrder = await MapOrder(order);

    return mapOrder;
  } catch (e) {
    throw new ServiceError(
      e.message || "Internal server error while find order",
      e.code || OrderCodes.NOT_FOUND
    );
  }
};

const findByUser = async (userId) => {
  try {
    const orders = await orderRepository.findByUser(userId);
    let mapOrders = [];
    for (const order of orders) {
      const mappedOrder = await MapOrder(order);
      mapOrders.push(mappedOrder);
    }

    return mapOrders;
  } catch (e) {
    throw new ServiceError(
      e.message || "Internal service error while find orders",
      e.code || OrderCodes.NOT_FOUND
    );
  }
};

const payOrder = async (payment, id, t) => {
  try {
    const order = await orderFindById(id);
    await order.addPayments([payment]);
    order.status = PAID;

    const saveOrder = await orderRepository.save(order, t);
    return saveOrder;
  } catch (e) {
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
  refundOrder
};
