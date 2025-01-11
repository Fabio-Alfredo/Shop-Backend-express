const { where } = require("sequelize");
const { Order } = require("../models");

const create = async (order) => {
  const newOrder = await Order.create(order);
  return newOrder;
};

const findById = async (id) => {
  const order = Order.findOne({ where: { id } });
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
