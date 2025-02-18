const Order_productRepository = require("../repositories/order_product.repository");
const ServiceError = require("../utils/errors/service.error");
const OrderCodes = require("../utils/errors/errorsCodes/order.code");

const createRelation = async (products, orderId, t) => {
  try {
    const orderProducts = products.map((product) => {
      return {
        productId: product.id,
        orderId: orderId,
        quantity: product.quantity,
      };
    });

    return await Order_productRepository.bulkCreate(orderProducts, t);
  } catch (e) {
    throw new ServiceError(
      e.message || "Internal server error while create order",
      e.code || OrderCodes.NOT_FOUND
    );
  }
};

const updateRelation = async (products, orderId, t) => {
  try {
    // Obtener los productos actuales en la orden
    const orderProducts = await findOrder(orderId);

    // Crear un mapa con los productos ya existentes
    console.log(orderProducts);
    const existingMap = new Map(
      orderProducts.map((p) => [p.productId, p.quantity])
    );

    const newOrderProducts = products.map((product) => {
      const existingQuantity = existingMap.get(product.id) || 0;

      return {
        productId: product.id,
        orderId: orderId,
        quantity: existingQuantity + product.quantity, 
      };
    });
    return await Order_productRepository.bulkCreate(newOrderProducts, t);
  } catch (e) {
    throw new ServiceError(
      e.message || "Internal server error while create order",
      e.code || OrderCodes.NOT_FOUND
    );
  }
};

const findOrder = async (orderId) => {
  try {
    const orderProducts = await Order_productRepository.findByOrder(orderId);
    if(!orderProducts) {
      throw new ServiceError(
        "Order not found",
        OrderCodes.NOT_FOUND
      );
    }

    return orderProducts;
  } catch (e) {
    throw new ServiceError(
      e.message || "Internal server error while create order",
      e.code || OrderCodes.NOT_FOUND
    );
  }
};

module.exports = {
  createRelation,
  findOrder,
  updateRelation,
};
