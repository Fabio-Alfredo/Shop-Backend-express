const { Payment } = require("../models");

const startTransaction = async () => {
  const t = await Payment.sequelize.transaction();
  return t;
};

const create = async (payment) => {
  const newPayment = await Payment.create(payment);
  return newPayment;
};

module.exports = {
  create,
    startTransaction,
};
