const orderRepository = require("../repositories/order.repository");
const order_productService = require("../services/order_product.service");
const productService = require("../services/product.service");
const variantsService = require('../services/product_variants.service')
const ServiceError = require("../utils/errors/service.error");
const OrderCodes = require("../utils/errors/errorsCodes/order.code");
const { PAID } = require('../utils/constants/ordersState.utils');

const createOrder = async (order, user) => {
  const t = await orderRepository.startTransaction();
  try {

    const { products, paymentDetails, ...orderData } = order;

    //añadimos al usuario a la orden a crear
    orderData.userId = user.id;
    //crear la nueva orden
    const newOrder = await orderRepository.create(orderData, t);

    //creamos la relacion de la orden y los productos
    await order_productService.createRelation(products, newOrder.id, t);

    //Creamos el nuevo calculo de los stock
    const newStock = await variantsService.reservationProducts(products, t);
    
    const orderWithProducts = await orderRepository.findById(newOrder.id, t);

    await t.commit();
    return orderWithProducts;
  } catch (e) {
    await t.rollback();
    throw new ServiceError(
      e.message || "Internal server error while create order",
      e.code || OrderCodes.NOT_FOUND
    );
  }
};

const orderFindById = async (id) => {
  try {
    const order = await orderRepository.findById(id);
    if (!order)
      throw new ServiceError(
        "Order not exist",
        OrderCodes.INVALID_ORDER
      );

    return order
  } catch (e) {
    throw new ServiceError(
      e.message || "Internal server error while find order",
      e.code || OrderCodes.NOT_FOUND
    );
  }
}

const payOrder = async (payment, id, t) => {
  try {
    const order = await orderFindById(id);
    await order.addPayments([payment]);
    order.status = PAID;

    const saveOrder = await orderRepository.save(order, t);
    return saveOrder
  } catch (e) {
    throw new ServiceError(
      e.message || "Internal server error while paid order",
      e.code || OrderCodes.NOT_FOUND
    );
  }
}

module.exports = {
  createOrder,
  orderFindById,
  payOrder
};
