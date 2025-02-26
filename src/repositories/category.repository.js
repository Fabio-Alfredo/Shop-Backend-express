const {Category} = require("../domain/models");

/**
 * Inicializa una transaccion
 * 
 * @returns {Promise<*>} transaccion
 */
const startTransaction = async () => {
  const t = await Category.sequelize.transaction();
  return t;
};

/**
 * Crea una nueva categoria
 * 
 * @param {object} category - datos de la categoria
 * @param t - transaccion
 * @returns {Promise<*>} categoria creada
 */
const create = async (category, t) => {
  const newCategory = await Category.create(category, { transaction: t });
  return newCategory;
};

/**
 * Busca una categoria por id
 * 
 * @param {number} category - id de la categoria
 * @returns {Promise<*>} categoria encontrada
 */
const findById = async (category) => {
  const eCategory = await Category.findOne({ where: { id:category } });
  return eCategory
};

/**
 * Busca todas las categorias
 *
 * @returns {Promise<*>} categorias encontradas
 */
const findAll = async ()=>{
  const categories = await Category.findAll();
  return categories;
}

module.exports = {
  create,
  findById,
  startTransaction,
  findAll
};
