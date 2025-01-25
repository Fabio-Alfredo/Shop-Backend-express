const { Transaction } = require("sequelize");
const { Order_product } = require("../models");

const startTransaction = async () => {
  const t = await Order_product.sequelize.transaction();
  return t;
};

const create = async (ordere_product, t) => {
  const newRelation = await Order_product.create(ordere_product, { transaction: t });
  return newRelation;
};


module.exports = {
  create,
  startTransaction,
}
