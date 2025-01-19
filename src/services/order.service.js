const orderRepository = require("../repositories/order.repository");
const order_productService = require("../services/order_product.service");
const productService = require("../services/product.service");
const ServiceError = require("../errors/service.error");
const OrderCodes = require("../utils/errorsCodes/order.code");
const {PAID}=require('../utils/constants/ordersState.utils');

const createOrder = async (order) => {
  const t = await orderRepository.startTransaction();
  try {
    const total = await productService.shopProduct(order.products, t);

    const { products, paymentDetails, ...orderData } = order;

    orderData.total = total;
    const newOrder = await orderRepository.create(orderData, t);

    for (const product of order.products) {
      await order_productService.createRelation({
        productId: product.id,
        orderId: newOrder.id,
        quantity: product.quantity,
        t
      });
    }
    await t.commit();
    return newOrder;
  } catch (e) {
    await  t.rollback();
    throw new ServiceError(
      e.message || "Internal server error while create order",
      e.code || OrderCodes.NOT_FOUND
    );
  }
};

const orderFindById =async (id)=>{
  try{
    const order = await orderRepository.findById(id);
    if(!order)
      throw new ServiceError(
       "Order not exist",
         OrderCodes.INVALID_ORDER
      );

    return order
  }catch(e){
    throw new ServiceError(
      e.message || "Internal server error while find order",
      e.code || OrderCodes.NOT_FOUND
    );
  }
}

const payOrder = async (payment, id, t)=>{
  try{
    const order = await orderFindById(id);
    await order.addPayments([payment]);
    order.status = PAID;

    const saveOrder = await orderRepository.save(order, t);
    return saveOrder
  }catch(e){
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
