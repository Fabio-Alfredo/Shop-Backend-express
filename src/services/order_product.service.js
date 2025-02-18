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

//validar cuando el numero enviado es menor a 0 para pder eliminar la relacion
const updateRelation = async (products, orderId, t) => {
  try {
    // Obtener los productos actuales en la orden
    const orderProducts = await findOrder(orderId);

    // Crear un mapa con los productos ya existentes
    const { toUpdate, toDelete } = await clasificarProductos(
      products,
      orderProducts,
      orderId
    );
   
    await Order_productRepository.bulkCreate(toUpdate, t);
    await Order_productRepository.deleteProduct(toDelete, orderId, t);
  
    return true;
  } catch (e) {
    throw new ServiceError(
      e.message || "Internal server error while create order",
      e.code || OrderCodes.NOT_FOUND
    );
  }
};

const clasificarProductos = async (products,orderProducts, orderId) => {
  const existingMap = new Map(orderProducts.map((p) => [p.productId, p.quantity]));

  const toUpdate = [];
  const toDelete = [];

  for (const product of products) {
    const existingQuantity = existingMap.get(product.id) || 0;
    const newQuantity = existingQuantity + product.quantity;

    if (newQuantity <= 0) {
      toDelete.push(product.id);
    } else {
      toUpdate.push({ productId: product.id, orderId, quantity: newQuantity });
    }
  }

  return { toUpdate, toDelete };
};

const findOrder = async (orderId) => {
  try {
    const orderProducts = await Order_productRepository.findByOrder(orderId);
    if (!orderProducts) {
      throw new ServiceError("Order not found", OrderCodes.NOT_FOUND);
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
