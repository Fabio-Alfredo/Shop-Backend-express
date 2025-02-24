const { Payment } = require("../domain/models");
const Order = require("../utils/errors/errorsCodes/order.code");

const startTransaction = async () => {
  const t = await Payment.sequelize.transaction();
  return t;
};

const create = async (payment, t) => {
  const newPayment = await Payment.create(payment, { transaction: t });
  return newPayment;
};

const findById = async (id) => {
  const payment = await Payment.findByPk(id, {
    include: {
      model: Order,
      through: { attributes: [] },
    },
  });
  return payment;
};

const findByOrderId = async (orderId) => {
  const payment = await Payment.findOne({
    include: {
      model: Order,
      where: { id: orderId },
      through: { attributes: [] },
    },
  });
  return payment;
};

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
