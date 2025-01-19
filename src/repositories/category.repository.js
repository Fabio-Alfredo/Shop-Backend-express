const {Category} = require("../models");

const startTransaction = async () => {
  const t = await Category.sequelize.transaction();
  return t;
};

const create = async (category) => {
  const newCategory = await Category.create(category);
  return newCategory;
};

const findById = async (category) => {
  const eCategory = await Category.findOne({ where: { id:category } });
  return eCategory
};

module.exports = {
  create,
  findById,
  startTransaction,
};
