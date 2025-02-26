const { Product, Product_variants, Category } = require("../domain/models");

/**
 * Inicializa una transaccion
 *
 * @returns {Promise<*>} transaccion
 */
const startTransaction = async () => {
  const t = await Product.sequelize.transaction();
  return t;
};

/**
 * Crea un nuevo producto
 *
 * @param {object} product - datos del producto
 * @param t - transaccion
 * @returns {Promise<*>} producto creado
 */
const create = async (product, t) => {
  const newProduct = await Product.create(product, { transaction: t });
  return newProduct;
};

/**
 * Busca un producto por sku
 *
 * @param {string} sku - sku del producto
 * @returns {Promise<*>} producto encontrado
 */
const findBySku = async (sku) => {
  const product = await Product.findOne({ where: { sku } });
  return product;
};

/**
 * Busca un producto por id
 *
 * @param {UUID} id - id del producto
 * @returns {Promise<*>} producto encontrado
 */
const findById = async (id) => {
  const product = await Product.findOne({ where: { id } });
  return product;
};

/**
 * Actualiza el stock de los productos
 *
 * @param {array[]} products - informacion de los productos
 * @param t - transaccion
 * @returns {Promise<*>} confirmacion de actualizacion
 */
const bulkUpdate = (products, t) => {
  return Product.bulkCreate(products, {
    updateOnDuplicate: ["stock"], //actualiza solo el stock
    transaction: t,
    where: { sku: products.map((products) => products.sku) }, //busca por sku
  });
};

/**
 * Busca todos los productos activos
 *
 * @returns {Promise<*>} productos encontrados o vacio
 */
const findAll = async () => {
  const prducts = await Product.findAll({
    where: { status: true },
    include: [
      {
        model: Product_variants, //incluye las variantes
        as: "product_variants",
      },
      {
        model: Category,
        through: { attributes: [] },
      }, //incluye la categoria
    ],
  });
  return prducts || [];
};

/**
 * Busca todos los productos por categoria
 *
 * @param {String} categoryId - id de la categoria
 * @returns {Promise<*>} productos encontrados
 */
const findAllByCategory = async (categoryId) => {
  const products = await Product.findAll({
    where: { status: true },
    include: [
      {
        model: Category, //incluye la categoria
        where: { id: categoryId }, //busca por id de categoria
        through: { attributes: [] }, //no se muestran los atributos de la relacion
      },
      {
        model: Product_variants, //incluye las variantes
        as: "product_variants",
      },
    ],
  });
  return products;
};

/**
 * Busca todos los productos por ids
 *
 * @param {array[]} productIds - ids de los productos
 * @returns {Promise<*>} productos encontrados
 */
const findAllByIds = async (productIds) => {
  const products = Product.findAll({ where: { id: productIds, status: true } });
  return products;
};

/**
 * Actualiza un producto
 *
 * @param {UUID} id - id del producto
 * @param {object} product - datos del producto
 * @param t - transaccion
 * @returns {Promise<*>} confirmacion de actualizacion
 */
const updateProduct = async (id, product, t) => {
  const productUpdated = await Product.update(product, {
    where: { id },
    fields: ["name", "description", "price"],
    transaction: t,
  });
  return productUpdated;
};

/**
 * Busca todos los productos por sku
 *
 * @param {array[]} skuProducts - skus de los productos
 * @returns {Promise<*>} productos encontrados
 */
const findAllBySku = async (skuProducts) => {
  const products = await Product.findAll({
    where: { sku: skuProducts, status: true },
  });
  return products;
};

/**
 * Elimina un producto o lo desactiva
 *
 * @param {UUID} id - id del producto
 * @param t - transaccion
 * @returns {Promise<*>} confirmacion de eliminacion
 */
const deleteProduct = async (id, t) => {
  const product = await Product.update(
    { status: false }, //desactiva el producto
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
