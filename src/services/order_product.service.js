const Order_productRepository = require("../repositories/order_product.repository");

const createRelation = async (order_product) => {
  try {
    const orderProduct = await Order_productRepository.create(order_product);
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
