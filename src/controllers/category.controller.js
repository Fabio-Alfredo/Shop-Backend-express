const createHttpError = require("http-errors");
const categoryService = require("../services/category.service");
const CategoryCodes = require("../utils/errors/errorsCodes/category.codes");
const responseHandler = require("../handlers/response.handler");

const createCategory = async (req, res, next) => {
  try {
    const category = req.body;
    const newCategory = await categoryService.createCategory(category);
    return responseHandler(res, 201, "Category created", newCategory);
  } catch (e) {
    switch (e.code) {
      case CategoryCodes.NOT_FOUND:
        next(createHttpError(500, e.message));
        break;
      case CategoryCodes.ALREADY_EXISTS:
        next(createHttpError(409, e.message));
        break;
      default:
        next(e);
    }
  }
};

const findAllCategories = async (req, res, next) => {
  try {
    const categories = await categoryService.findAll();
    return responseHandler(res, 200, "sucess", categories);
  } catch (e) {
    switch (e.code) {
      case CategoryCodes.NOT_FOUND:
        next(createHttpError(500, e.message));
        break;
      default:
        next(e);
    }
  }
};

module.exports = {
  createCategory,
  findAllCategories,
};
