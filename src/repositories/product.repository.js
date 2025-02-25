const { Product, Product_variants, Category } = require("../domain/models");

//inicializa las transacciones
const startTransaction = async () => {
  const t = await Product.sequelize.transaction();
  return t;
};

//crea un nuevo producto
const create = async (product, t) => {
  const newProduct = await Product.create(product, { transaction: t });
  return newProduct;
};

//busca un producto por su sku
const findBySku = async (sku) => {
  console.log(sku);
  const product = await Product.findOne({ where: { sku } });
  return product;
};

//busca un producto por su id
const findById = async (id) => {
  const product = await Product.findOne({ where: { id } });
  return product;
};

//actualiza el stock de los productos por sku,
//si el producto no existe lo crea
const bulkUpdate = (products, t) => {
  return Product.bulkCreate(products, {
    updateOnDuplicate: ["stock"],
    transaction: t,
    where: { sku: products.map((products) => products.sku) },
  });
};

//busca todos los productos
//incluye las variantes de los productos
const findAll = async () => {
  const prducts = await Product.findAll({
    where: { status: true },
    include: {
      model: Product_variants,
      as: "product_variants",
    },
  });
  return prducts || [];
};

//busca todos los productos por categoria
//incluye la categoria a la que pertenece
const findAllByCategory = async (categoryId) => {
  const products = await Product.findAll({
    where: { status: true },
    include: {
      model: Category,
      where: { id: categoryId },
      through: { attributes: [] },
    },
  });
  return products;
};

//busca todos los productos por id y con estado activo
//incluye las variantes de los productos
const findAllByIds = async (productIds) => {
  const products = Product.findAll({ where: { id: productIds, status: true } });
  return products;
};

//actualiza todos los datos de un producto
const updateProduct = async (id, product, t) => {
  const productUpdated = await Product.update(product, {
    where: { id },
    transaction: t,
  });
  return productUpdated;
};

//busca todos los productos por sku, solo los activos
const findAllBySku = async (skuProducts) => {
  const products = await Product.findAll({
    where: { sku: skuProducts, status: true },
  });
  return products;
};

//elimina un producto, solo cambia el estado a inactivo
const deleteProduct = async (id, t) => {
  const product = await Product.update(
    { status: false },
    { where: { id } },
    { transaction: t }
  );
  return product;
};

module.exports = {
  create,
  findById,
  bulkUpdate,
  findAll,
  findAllByIds,
  startTransaction,
  findBySku,
  findAllBySku,
  updateProduct,
  findAllByCategory,
  deleteProduct,
};
