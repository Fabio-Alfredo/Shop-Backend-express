const { Order_product, Product_variants } = require("../domain/models");

/**
 * Inicializa una transaccion
 * 
 * @returns {Promise<*>} transaccion
 */
const startTransaction = async () => {
  const t = await Order_product.sequelize.transaction();
  return t;
};

/**
 * Crea una nueva relacion entre orden y producto
 * 
 * @param {object} order_products - datos de la relacion
 * @param t - transaccion
 * @returns {Promise<*>} relacion creada
 */
const create = async (order_products, t) => {
  const newRelation = await Order_product.create(order_products, {
    transaction: t,
  });
  return newRelation;
};

/**
 * Crea una nuevas relaciones entre ordenes y productos
 *
 * @param {object} order_products - datos de las relaciones
 * @param t - transaccion
 * @returns {Promise<*>} relaciones creadas
 */

const bulkCreate = async (order_products, t) => {
  const newOrder = await Order_product.bulkCreate(order_products, {
    transaction: t,
    updateOnDuplicate: ["quantity"], //actualiza la cantidad si ya existe la relacion
  });
  return newOrder;
};

/**
 * Busca los productos de una orden
 * 
 * @param {number} orderId - id de la orden
 * @param t - transaccion
 * @returns {Promise<*>} productos de la orden
 */
const findByOrder = async (orderId, t) => {
  const orderProducts = await Order_product.findAll({
    where: { orderId },
    transaction: t,
  });
  return orderProducts;
};

module.exports = {
  create,
  startTransaction,
  bulkCreate,
  findByOrder,
};
