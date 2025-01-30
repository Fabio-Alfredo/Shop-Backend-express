const { where } = require("sequelize");
const { Order } = require("../models");

const startTransaction = async ()=>{
  const t = await Order.sequelize.transaction();
    return t;
}

const create = async (order, t) => {
  const newOrder = await Order.create(order, {transaction:t});
  return newOrder;
};

const findById = async (orderId) => {
  const order = await Order.findOne({ where: { id:orderId } });
  return order;
};

const save = async(order, t)=>{
  const newOrder = order.save({transaction: t});
  return newOrder;
}

module.exports = {
  create,
  findById,
  save,
  startTransaction,
};
