const { Order_product, Product_variants } = require("../domain/models");

//inicializa las transacciones
const startTransaction = async () => {
  const t = await Order_product.sequelize.transaction();
  return t;
};

//crea una nueva relacion entre orden y producto
const create = async (order_products, t) => {
  const newRelation = await Order_product.create(order_products, {
    transaction: t,
  });
  return newRelation;
};

//crea una nueva relacion entre orden y producto
const bulkCreate = async (order_products, t) => {
  const newOrder = await Order_product.bulkCreate(order_products, {
    transaction: t,
    updateOnDuplicate: ["quantity"],
  });
  return newOrder;
};

//busca los productos de una orden
//por id de orden
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
