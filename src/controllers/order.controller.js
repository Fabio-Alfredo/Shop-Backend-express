const orderService = require("../services/order.service");

const createOrder = async (req, res, next) => {
  try {
    const order = req.body;
    const newOrder = await orderService.createOrder(order);
    res.status(200).json(newOrder);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createOrder,
};
