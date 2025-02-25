const {
  Order,
  Product,
  User,
  Order_product,
  Product_variants,
} = require("../domain/models");

//inicializa las transacciones
const startTransaction = async () => {
  const t = await Order.sequelize.transaction();
  return t;
};

//crea una nueva orden
const create = async (order, t) => {
  const newOrder = await Order.create(order, { transaction: t });
  return newOrder;
};

//elimina una orden por id
const deleteOrder = async (orderId, t) => {
  const deletedOrder = await Order.destroy({
    where: { id: orderId },
    transaction: t,
  });
  return deletedOrder;
};

//busca las ordenes de un usuario
//incluye los productos, variantes y detalles de la orden
const findByUser = async (userId) => {
  const order = await Order.findAll({
    where: { userId: userId },
    include: [
      {
        model: Product_variants,
        attributes: ["color", "size"],
        through: {
          model: Order_product,
          attributes: ["quantity"],
        },
        include: [
          {
            model: Product,
            attributes: ["sku", "name", "description", "price"],
          },
        ],
      },
    ],
  });

  return order;
};

//busca una orden por id
//incluye los productos, variantes, detalles de la orden y usuario
const findById = async (orderId, t) => {
  const order = await Order.findOne({
    where: { id: orderId },
    include: [
      {
        model: Product_variants,
        attributes: ["id", "color", "size"],
        through: {
          model: Order_product,
          attributes: ["quantity"],
        },
        include: [
          {
            model: Product,
            attributes: ["sku", "name", "description", "price"],
          },
        ],
      },

      {
        model: User,
        as: "user",
        attributes: ["name", "email"],
      },
    ],
    transaction: t,
  });
  return order;
};

//guarda una orden
const save = async (order, t) => {
  const newOrder = await order.save({ transaction: t });
  return newOrder;
};

module.exports = {
  create,
  findById,
  save,
  startTransaction,
  findByUser,
  deleteOrder
};
