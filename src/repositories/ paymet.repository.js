const { Payment } = require("../models");

const startTransaction = async () => {
  const t = await Payment.sequelize.transaction();
  return t;
};

const create = async (payment, t) => {
  const newPayment = await Payment.create(payment, { transaction: t });
  return newPayment;
};

module.exports = {
  create,
    startTransaction,
};
