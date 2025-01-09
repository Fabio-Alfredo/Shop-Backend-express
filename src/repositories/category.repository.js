const {Category} = require("../models");

const create = async (category) => {
  const newCategory = await Category.create(category);
  return newCategory;
};

const findCategoryByName = async (category) => {
  const eCategory = await Category.findOne({ where: { category } });
  return eCategory
};

module.exports = {
  create,
  findCategoryByName
};
