const orderRepository = require("../repositories/order.repository");
const order_productService = require("../services/order_product.service");
const productService = require("../services/product.service");
const OrderCodes = require("../utils/errorsCodes/order.code");

const createOrder = async (order) => {
  try {
    const total = await productService.shopProduct(order.products);
    
    order.total = total;
    const newOrder = await orderRepository.create(order);
    for (const product of order.products) {
      await order_productService.createRelation({
        productId: product.id,
        orderId: order.id,
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

module.exports = {
  createOrder,
};
