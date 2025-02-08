const { Order, Order_product, Product_variants } = require("../models");

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
    include: {
      model: Product_variants,
      through: {
        attributes: [] // Excluye todos los atributos de la tabla intermedia `Order_product`
      }
    },
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
