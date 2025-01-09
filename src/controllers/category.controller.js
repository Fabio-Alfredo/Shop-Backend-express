const createHttpError = require("http-errors");
const categoryService = require("../services/category.service");
const CategoryCodes = require("../utils/errorsCodes/category.code");

const createCategory = async (req, res, next) => {
  try {
    const category = req.body;
    const newCategory = await categoryService.createCategory(category);
    res.status(201).json(newCategory);
  } catch (e) {
    switch (e.code) {
      case CategoryCodes.NOT_FOUND:
        next(500, e.message);
        break;
      default:
        next(e);
    }
  }
};

module.exports={
    createCategory
}
