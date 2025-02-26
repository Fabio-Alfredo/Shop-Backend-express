const {
  Order,
  Product,
  User,
  Order_product,
  Product_variants,
} = require("../domain/models");

/**
 * Inicializa una transaccion
 *
 * @returns {Promise<*>} transaccion
 */
const startTransaction = async () => {
  const t = await Order.sequelize.transaction();
  return t;
};

/**
 * Crea una nueva orden
 *
 * @param {object} order - datos de la orden
 * @param t - transaccion
 * @returns {Promise<*>} orden creada
 */
const create = async (order, t) => {
  const newOrder = await Order.create(order, { transaction: t });
  return newOrder;
};

/**
 * Elimina una orden
 *
 * @param {number} orderId - id de la orden
 * @param t - transaccion
 * @returns {Promise<*>} confirmacion de eliminacion
 */
const deleteOrder = async (orderId, t) => {
  const deletedOrder = await Order.destroy({
    where: { id: orderId },
    transaction: t,
  });
  return deletedOrder;
};

/**
 * Busca una orden por usuario
 *
 * @param {number} userId - id del usuario
 * @returns {Promise<*>} ordenes del usuario con sus productos
 */
const findByUser = async (userId) => {
  const order = await Order.findAll({
    where: { userId: userId },
    include: [
      {
        model: Product_variants, //incluye los productos con sus variantes
        attributes: ["color", "size"], //atributos de las variantes
        through: {
          model: Order_product, //modelo de la relacion
          attributes: ["quantity"], //atributos de la relacion
        },
        include: [
          {
            model: Product, //incluye los productos
            attributes: ["sku", "name", "description", "price"], //atributos de los productos
          },
        ],
      },
    ],
  });

  return order;
};

/**
 * Busca una orden por id
 *
 * @param {number} orderId - id de la orden
 * @param t - transaccion
 * @returns {Promise<*>} orden con sus productos y usuario
 */
const findById = async (orderId, t) => {
  const order = await Order.findOne({
    where: { id: orderId },
    include: [
      {
        model: Product_variants, //incluye los productos con sus variantes
        attributes: ["id", "color", "size"], //atributos de las variantes
        through: {
          model: Order_product, //modelo de la relacion
          attributes: ["quantity"], //atributos de la relacion
        },
        include: [
          {
            model: Product, //incluye los productos
            attributes: ["sku", "name", "description", "price"], //atributos de los productos
          },
        ],
      },

      {
        model: User, //incluye el usuario
        as: "user",
        attributes: ["id","name", "email"], //atributos del usuario
      },
    ],
    transaction: t,
  });
  return order;
};

/**
 * Guarda una orden
 *
 * @param {object} order - datos de la orden
 * @param t - transaccion
 * @returns {Promise<*>} orden guardada
 */
const save = async (order, t) => {
  const newOrder = await order.save({ transaction: t });
  return newOrder;
};

const updateOrder = async (orderId, data, t) => {
  const updatedOrder = await Order.update(data, {
    where: { id: orderId },
    transaction: t,
  });
  return updatedOrder;
}
module.exports = {
  create,
  findById,
  save,
  startTransaction,
  findByUser,
  deleteOrder,
  updateOrder
};
