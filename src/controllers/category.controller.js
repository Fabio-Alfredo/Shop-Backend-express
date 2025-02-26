const createHttpError = require("http-errors");
const categoryService = require("../services/category.service");
const CategoryCodes = require("../utils/errors/errorsCodes/category.codes");
const responseHandler = require("../handlers/response.handler");

/**
 * Controlador para crear una nueva categoria
 * 
 * @param {object} req - datos de la categoria a crear
 * @param {object} res - respuesta con la categoria creada
 * @param {object} next - middleware para manejar errores
 * @returns {object} respuesta con la categoria creada
 */
const createCategory = async (req, res, next) => {
  try {
    //se obtiene la categoria a crear
    const category = req.body;
    //se crea la categoria
    const newCategory = await categoryService.createCategory(category);
    //se retorna la categoria creada
    return responseHandler(res, 201, "Category created", newCategory);
  } catch (e) {
    //en caso de error se lanza una excepcion adecuada al error
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

/**
 * Controlador para obtener todas las categorias
 * 
 * @param {object} req - datos de la categoria a crear
 * @param {object} res - respuesta con las categorias
 * @param {object} next - middleware para manejar errores
 * @returns {object} respuesta con las categorias
 */
const findAllCategories = async (req, res, next) => {
  try {
    //se obtienen todas las categorias
    const categories = await categoryService.findAll();
    //se retornan las categorias
    return responseHandler(res, 200, "sucess", categories);
  } catch (e) {
    //en caso de error se lanza una excepcion adecuada al error
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
