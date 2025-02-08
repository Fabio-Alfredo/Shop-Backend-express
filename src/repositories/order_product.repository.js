const { Order_product, Product_variants } = require("../models");

const startTransaction = async () => {
  const t = await Order_product.sequelize.transaction();
  return t;
};

const create = async (order_products, t) => {
  const newRelation = await Order_product.create(order_products, { transaction: t  });
  return newRelation;
};

const bulkCreate = async (order_products, t)=>{
  const newOrder = await Order_product.bulkCreate(order_products, {transaction: t});
  return newOrder;
}


module.exports = {
  create,
  startTransaction,
  bulkCreate
}
