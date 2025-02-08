const { Order, Product, Order_product, Product_variants } = require("../models");

const startTransaction = async () => {
  const t = await Order.sequelize.transaction();
  return t;
};

const create = async (order, t) => {
  const newOrder = await Order.create(order, { transaction: t });
  return newOrder;
};

const findById = async (orderId, t) => {
  const order = await Order.findOne({
    where: { id: orderId },
    include:[
      {
        model:Product_variants,
        attributes:['color', 'size'],
        through:{
          model: Order_product,
          attributes:['quantity']
        },
        include:[
          {
            model: Product,
            attributes:['sku', 'name', 'description', 'price']
          }
        ]
      },
     
    ],
    transaction: t,
  });
  return order;
};

const save = async (order, t) => {
  const newOrder = order.save({ transaction: t });
  return newOrder;
};

module.exports = {
  create,
  findById,
  save,
  startTransaction,
};
