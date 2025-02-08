const Order_productRepository = require("../repositories/order_product.repository");
const ServiceError = require("../utils/errors/service.error");
const OrderCodes = require("../utils/errors/errorsCodes/order.code");

const createRelation = async (products, orderId, t) => {
  try {
    const orderProducts = products.map(product =>{
      return {
        productId: product.id,
        orderId:orderId,
        quantity: product.quantity
      }
    })


    return await Order_productRepository.bulkCreate(orderProducts, t);;
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



