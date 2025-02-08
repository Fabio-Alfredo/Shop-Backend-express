const orderService = require("../services/order.service");

const createOrder = async (req, res, next) => {
  try {
    const data = req.body;
    const user = req.user
    const order = await orderService.createOrder(data, user);
    const newOrder  = await orderService.orderFindById(order.id)
    res.status(200).json(newOrder);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createOrder,
};
