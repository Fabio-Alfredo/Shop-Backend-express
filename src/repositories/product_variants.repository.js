const { Product_variants, Product } = require("../domain/models");

/**
 * Guarda las variantes de un producto
 *
 * @param {object} variants - variantes del producto
 * @param t - transaccion
 * @returns {Promise<*>} variantes guardadas
 */
const save = async (variants, t) => {
  const saveVariants = await Product_variants.bulkCreate(variants, {
    transaction: t,
  });
  return saveVariants;
};

/**
 * Busca todas las variantes por id
 * 
 * @param {array[]} ids - ids de las variantes
 * @returns {Promise<*>} variantes de los productos
 */
const findAllByIds = async (ids) => {
  const products = await Product_variants.findAll({
    where: { id: ids },
    include: { model: Product }, //incluye el producto
  });
  return products;
};

/**
 * Actualiza el stock de las variantes
 * 
 * @param {array[]} products - variantes de los productos
 * @param t - transaccion
 * @returns {Promise<*>} confirmacion de actualizacion
 */
const bulkUpdateStock = async (products, t) => {
  const _products = await Product_variants.bulkCreate(products, {
    updateOnDuplicate: ["stock"], //actualiza el stock
    transaction: t,
  });
  return _products;
};

/**
 * Actualiza los productos
 * 
 * @param {UUID} id - id de la variante
 * @param {object} product - datos de la variante
 * @param t - transaccion
 * @returns {Promise<*>} confirmacion de actualizacion
 */
const udpateProducts = async (id, product, t) => {
  const updateProducts = await Product_variants.update(product, {
    where: { id },
    transaction: t,
  });
  return updateProducts;
};

module.exports = {
  save,
  findAllByIds,
  bulkUpdateStock,
  udpateProducts,
};
