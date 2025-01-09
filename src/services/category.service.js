const categoryRepository = require("../repositories/category.repository");
const ServiceError = require("../errors/service.error");
const CategoryCodes = require("../utils/errorsCodes/category.code");

const createCategory = async (category) => {
  try {
    const existCategory = await categoryRepository.findCategoryByName(
      category.category
    );

    if (existCategory)
      throw new ServiceError("Category already exist",CategoryCodes.ALREADY_EXISTS);

    const newCategory = await categoryRepository.create(category);
    return newCategory;
  } catch (e) {
    throw new ServiceError(
      e.message || "Internal server error while create category",
      e.code || CategoryCodes.NOT_FOUND
    );
  }
};

module.exports = {
  createCategory,
};
