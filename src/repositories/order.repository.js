const { where } = require("sequelize");
const { Order } = require("../models");

const create = async (order) => {
  const newOrder = await Order.create(order);
  return newOrder;
};

const findById = async (orderId) => {
  const order = await Order.findOne({ where: { id:orderId } });
  return order;
};

const save = async(order )=>{
  const oder = order.save();
  return order;
}

module.exports = {
  create,
  findById,
  save
};
