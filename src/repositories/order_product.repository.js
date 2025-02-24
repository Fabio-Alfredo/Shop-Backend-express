const { where } = require("sequelize");
const { Order_product, Product_variants } = require("../domain/models");

const startTransaction = async () => {
  const t = await Order_product.sequelize.transaction();
  return t;
};

const create = async (order_products, t) => {
  const newRelation = await Order_product.create(order_products, {
    transaction: t,
  });
  return newRelation;
};

const bulkCreate = async (order_products, t) => {
  const newOrder = await Order_product.bulkCreate(order_products, {
    transaction: t,
    updateOnDuplicate: ["quantity"],
  });
  return newOrder;
};


const findByOrder = async (orderId, t) => {
  const orderProducts = await Order_product.findAll({
    where: { orderId },
    transaction: t,
  });
  return orderProducts;
};

module.exports = {
  create,
  startTransaction,
  bulkCreate,
  findByOrder,
};
