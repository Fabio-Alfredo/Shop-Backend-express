const orderRepository = require("../repositories/order.repository");
const order_productService = require("../services/order_product.service");
const productService = require("../services/product.service");
const ServiceError = require("../errors/service.error");
const OrderCodes = require("../utils/errorsCodes/order.code");
const {PAID}=require('../utils/constants/ordersState.utils');

const createOrder = async (order) => {
  try {
    const total = await productService.shopProduct(order.products);

    const { products, paymentDetails, ...orderData } = order;

    orderData.total = total;
    const newOrder = await orderRepository.create(orderData);

    for (const product of order.products) {
      await order_productService.createRelation({
        productId: product.id,
        orderId: newOrder.id,
        quantity: product.quantity,
      });
    }

    return newOrder;
  } catch (e) {
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

const payOrder = async (payment, id)=>{
  try{
    const order = orderFindById(id);
    await order.addPayment(payment);
    order.status = PAID;

    const saveOrder = await orderRepository.save(order);
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
