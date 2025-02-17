const { where, or } = require("sequelize");
const {
  Order,
  Product,
  User,
  Order_product,
  Product_variants,
} = require("../models");

const startTransaction = async () => {
  const t = await Order.sequelize.transaction();
  return t;
};

const create = async (order, t) => {
  const newOrder = await Order.create(order, { transaction: t });
  return newOrder;
};

const findByUser = async(userId)=>{
  const order = await Order.findAll({
    where:{userId:userId},
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
  })

  return order;
}

const findById = async (orderId, t) => {
  const order = await Order.findOne({
    where: { id: orderId },
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

      {
        model: User,
        as: 'user',
        attributes: ["name", "email"],
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
  findByUser
};
