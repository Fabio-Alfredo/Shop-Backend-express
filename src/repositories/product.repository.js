const { where } = require("sequelize");
const { Product } = require("../models");

const create = async (product) => {
  const newProduct = await Product.create(product);
  return newProduct;
};

const findById = async (id) => {
  const category = await Product.findOne({ where: { id } });
  return category;
};

module.exports = {
  create,
  findById
};
