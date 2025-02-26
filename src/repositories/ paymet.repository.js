const { Payment, Order } = require("../domain/models");

/**
 * Inicializa una transaccion
 * 
 * @returns {Promise<*>} transaccion
 */
const startTransaction = async () => {
  const t = await Payment.sequelize.transaction();
  return t;
};

/**
 * Crea un nuevo pago
 * 
 * @param {object} payment - datos del pago
 * @param t - transaccion
 * @returns {Promise<*>} pago creado
 */
const create = async (payment, t) => {
  const newPayment = await Payment.create(payment, { transaction: t });
  return newPayment;
};

/**
 * Busca un pago por id
 * 
 * @param {number} id - id del pago
 * @returns {Promise<*>} pago junto con la orden
 */
const findById = async (id) => {
  const payment = await Payment.findByPk(id, {
    include: {
      model: Order,
      through: { attributes: [] }, //no se muestran los atributos de la relacion
    },
  });
  return payment;
};

/**
 * Busca un pago por id de orden
 * 
 * @param {number} orderId - id de la orden
 * @returns {Promise<*>} pago junto con la orden
 */
const findByOrderId = async (orderId) => {
  const payment = await Payment.findOne({
    include: {
      model: Order,
      where: { id: orderId },
      through: { attributes: [] }, //no se muestran los atributos de la relacion
    },
  });
  
  return payment;
};

/**
 * Actualiza un pago
 * 
 * @param {object} payment - datos del pago
 * @param {number} id - id del pago
 * @param t - transaccion
 * @returns {Promise<*>} cofirmacion de pago actualizado
 */
const update = async (payment, id, t) => {
  const updatedPayment = await Payment.update(payment, {
    where: { id },
    transaction: t,
  });
  return updatedPayment;
};

module.exports = {
  create,
  startTransaction,
  findById,
  update,
  findByOrderId,
};
