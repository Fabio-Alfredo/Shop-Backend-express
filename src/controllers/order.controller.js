const orderService = require("../services/order.service");
const responseHandler = require('../handlers/response.handler');

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

const getOrderById= async(req, res, next)=>{
  try{
    const {id} = req.params;
    const order = await orderService.orderFindById(id);
    responseHandler(res, 200, "sussecc", order);
  }catch(e){
    next(e)
  }
}

const getOrdersByUser = async (req, res, next)=>{
  try{
    const user = req.user;
    const orders = await orderService.findByUser(user.id);
    responseHandler(res, 200, 'succes', orders)
  }catch(e){
    next(e)
  }
}

module.exports = {
  createOrder,
  getOrderById,
  getOrdersByUser
};
