const orderService = require("../services/order.service");

const createOrder = async (req, res, next) => {
  try {
    const order = req.body;
    const user = req.user
    const newOrder = await orderService.createOrder(order, user);
    res.status(200).json(newOrder);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createOrder,
};
