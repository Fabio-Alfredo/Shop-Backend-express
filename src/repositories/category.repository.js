const {Category} = require("../domain/models");

//inicializa las transacciones
const startTransaction = async () => {
  const t = await Category.sequelize.transaction();
  return t;
};

//crea una nueva categoria
const create = async (category) => {
  const newCategory = await Category.create(category);
  return newCategory;
};

//busca una categoria por id
const findById = async (category) => {
  const eCategory = await Category.findOne({ where: { id:category } });
  return eCategory
};

//busca todas las categorias
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
