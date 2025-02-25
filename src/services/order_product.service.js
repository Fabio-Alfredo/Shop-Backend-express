const Order_productRepository = require("../repositories/order_product.repository");
const ServiceError = require("../utils/errors/service.error");
const OrderCodes = require("../utils/errors/errorsCodes/order.code");

//FUNCION PARA CREAR LA RELACION ENTRE ORDEN Y PRODUCTOS
const createRelation = async (products, orderId, t) => {
  try {
    //se crea un array con los productos a guardar
    const orderProducts = products.map((product) => {
      return {
        productId: product.id,
        orderId: orderId,
        quantity: product.quantity,
      };
    });

    //se guardan los productos de la orden
    //se retorna los productos guardados
    return await Order_productRepository.bulkCreate(orderProducts, t);
  } catch (e) {
    //en caso de error se lanza una excepcion
    throw new ServiceError(
      e.message || "Internal server error while create order",
      e.code || OrderCodes.NOT_FOUND
    );
  }
};

//FUNCION PARA BUSCAR UNA ORDEN
const findOrder = async (orderId) => {
  try {
    //se busca la orden por id
    const orderProducts = await Order_productRepository.findByOrder(orderId);
    //si no existe se lanza una excepcion
    if (!orderProducts) {
      throw new ServiceError("Order not found", OrderCodes.NOT_FOUND);
    }

    //se retorna los productos de la orden
    return orderProducts;
  } catch (e) {
    //en caso de error se lanza una excepcion
    throw new ServiceError(
      e.message || "Internal server error while create order",
      e.code || OrderCodes.NOT_FOUND
    );
  }
};

module.exports = {
  createRelation,
  findOrder,
};
