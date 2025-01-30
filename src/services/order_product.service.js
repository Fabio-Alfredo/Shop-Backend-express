const Order_productRepository = require("../repositories/order_product.repository");
const ServiceError = require("../utils/errors/service.error");
const OrderCodes = require("../utils/errors/errorsCodes/order.code");

const createRelation = async (order_products, t) => {
  try {
    const orderProduct = await Order_productRepository.bulkCreate(order_products, t);
    return orderProduct;
  } catch (e) {
    throw new ServiceError(
        e.message || "Internal server error while create order",
        e.code || OrderCodes.NOT_FOUND
    );
  }
};


module.exports={
  createRelation
}



