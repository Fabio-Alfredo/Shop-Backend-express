const categoryRepository = require("../repositories/category.repository");
const ServiceError = require("../utils/errors/service.error");
const CategoryCodes = require("../utils/errors/errorsCodes/category.codes");

const createCategory = async (category) => {
  try {
    const existCategory = await categoryRepository.findById(category.id);

    if (existCategory)
      throw new ServiceError(
        "Category already exist",
        CategoryCodes.ALREADY_EXISTS
      );

    const newCategory = await categoryRepository.create(category);
    return newCategory;
  } catch (e) {
    throw new ServiceError(
      e.message || "Internal server error while create category",
      e.code || CategoryCodes.NOT_FOUND
    );
  }
};

const findById = async (id) => {
  try {
    const category = await categoryRepository.findById(id);
    if (!category)
      throw new ServiceError(
        "Category Not exist",
        CategoryCodes.ALREADY_EXISTS
      );
    return category;
  } catch (e) {
    throw new ServiceError(
      e.message || "Internal server error while find category",
      e.code || CategoryCodes.NOT_FOUND
    );
  }
};

const findAll = async () => {
  try {
    const categories = await categoryRepository.findAll();
    return categories;
  } catch (e) {
    throw new ServiceError(
      e.message || "Internal server error while find all categories",
      e.code || CategoryCodes.NOT_FOUND
    );
  }
};

module.exports = {
  createCategory,
  findById,
  findAll,
};
