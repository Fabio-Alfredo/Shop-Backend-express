const { where } = require("sequelize");
const { Product } = require("../models");

const startTransaction = async () => {
  const t = await Product.sequelize.transaction();
  return t;
};

const create = async (product, t) => {
  const newProduct = await Product.create(product, {transaction:t});
  return newProduct;
};

const findById = async (id) => {
  const product = await Product.findOne({ where: { id } });
  return product;
};

const update = async (product, t) => {
  const updated = await product.save({transaction:t});
  return updated;
};

const findAll = async (productIds) => {
  const products = Product.findAll({ where: { id: productIds } });
  return products;
};

module.exports = {
  create,
  findById,
  update,
  findAll,
  startTransaction,
};
