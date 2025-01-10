const { where } = require("sequelize");
const { Product } = require("../models");

const create = async (product) => {
  const newProduct = await Product.create(product);
  return newProduct;
};

const findById = async (id) => {
  const product = await Product.findOne({ where: { id } });
  return product;
};

const update = async (product) => {
  const updated = await product.save();
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
  findAll
};
