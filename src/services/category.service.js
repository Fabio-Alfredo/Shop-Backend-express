const categoryRepository = require("../repositories/category.repository");
const ServiceError = require("../utils/errors/service.error");
const CategoryCodes = require("../utils/errors/errorsCodes/category.codes");

//FUNCION PARA CREAR UNA NUEVA CATEGORIA
const createCategory = async (category) => {
  const t = await categoryRepository.startTransaction();
  try {
    //Validacion de la existencia de una categoria con ese id
    const existCategory = await categoryRepository.findById(category.id);
    //si existe se lanza una excepcion
    if (existCategory)
      throw new ServiceError(
        "Category already exist",
        CategoryCodes.ALREADY_EXISTS
      );

    //se crea una nueva categoria
    //se retorna la categoria creada
    const newCategory = await categoryRepository.create(category, t);
    return newCategory;
  } catch (e) {
    //en caso de error se lanza una excepcion
    throw new ServiceError(
      e.message || "Internal server error while create category",
      e.code || CategoryCodes.NOT_FOUND
    );
  }
};

//FUNCION PARA BUSCAR UNA CATEGORIA POR ID
const findById = async (id) => {
  try {
    //se busca la categoria por id
    const category = await categoryRepository.findById(id);
    //si no existe se lanza una excepcion
    if (!category)
      throw new ServiceError(
        "Category Not exist",
        CategoryCodes.ALREADY_EXISTS
      );

    //se retorna la categoria si todo fue exitoso
    return category;
  } catch (e) {
    //en caso de error se lanza una excepcion
    throw new ServiceError(
      e.message || "Internal server error while find category",
      e.code || CategoryCodes.NOT_FOUND
    );
  }
};

//FUNCION PARA BUSCAR TODAS LAS CATEGORIAS
const findAll = async () => {
  try {
    //se buscan todas las categorias
    //se retorna un array de categorias
    const categories = await categoryRepository.findAll();
    return categories;
  } catch (e) {
    //en caso de error se lanza una excepcion
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
