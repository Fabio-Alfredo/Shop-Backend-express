const Order_productRepository = require("../repositories/order_product.repository");
const ServiceError = require("../errors/service.error"); 
const OrderCodes = require("../utils/errorsCodes/order.code");   

const createRelation = async (order_product, t) => {
  try {
    const orderProduct = await Order_productRepository.create(order_product, {transaction:t});
    return orderProduct;
  } catch (e) {
    throw new ServiceError(
      e.message || "Internal server error while create order",
      e.code || OrderCodes.NOT_FOUND
    );
  }
};

module.exports = {
  createRelation,
};
