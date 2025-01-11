const { Order } = require("../models");

const create = async (order) => {
  const newOrder = await Order.create(order);
  return newOrder;
};

module.exports = {
  create,
};
