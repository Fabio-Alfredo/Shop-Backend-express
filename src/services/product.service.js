const productRepository = require("../repositories/product.repository");
const categoryService = require("../services/category.service");
const variantsService = require("../services/product_variants.service");
const ProductCodes = require("../utils/errors/errorsCodes/product.codes");
const ServiceError = require("../utils/errors/service.error");

/**
 * Servicio para registrar un nuevo producto
 *
 * @param {string} sku - sku del producto
 * @param {string} name - nombre del producto
 * @param {string} description - descripcion del producto
 * @param {number} price - precio del producto
 * @param {number} stock - stock del producto
 * @param {Array<Object>} variants - variantes del producto
 * @param {String} category - id de la categoria del producto
 * @returns {Promise<Object>} producto creado
 * @throws {ServiceError} error con detalles del problema
 */
const registerProduct = async (
  sku,
  name,
  description,
  price,
  stock,
  variants,
  category
) => {
  const t = await productRepository.startTransaction();
  try {
    //Validacion de la existencia de un producto con ese sku
    await findBySku(sku);

    //se create un nuevo producto
    const product = await productRepository.create(
      { sku, name, description, price, stock },
      t
    );

    //se guardan las variantes del producto
    await variantsService.save(variants, product.id, t);
    //se asigna la categoria al producto
    await assingCategory(product, category, t);

    //se confirma la transaccion
    //se retorna el producto creado
    await t.commit();
    return product;
  } catch (e) {
    //en caso de error se hace un rollback de la transaccion
    //se lanza una excepcion
    await t.rollback();
    throw new ServiceError(
      e.message || "Internal server error while create product",
      e.code || ProductCodes.NOT_FOUND
    );
  }
};

/**
 * Funcion para asignar una categoria a un producto
 *
 * @param {Object} product - producto al que se le asignara la categoria
 * @param {String} categoryId - id de la categoria
 * @param {Object} t - transaccion
 * @returns {Promise<Object>} producto con la categoria asignada
 * @throws {ServiceError} error con detalles del problema
 */
const assingCategory = async (product, categoryId, t) => {
  try {
    //se busca la categoria por id
    //se asigna la categoria al producto
    const category = await categoryService.findById(categoryId);
    if (category) {
      await product.setCategories([categoryId], { transaction: t });
    }
    //se retorna el producto
    return product;
  } catch (e) {
    //en caso de error se lanza una excepcion
    throw new ServiceError(
      e.message || "Internalserver error while assign category",
      e.code || ProductCodes.NOT_FOUND
    );
  }
};

/**
 * Servicio para buscar un producto por sku
 *
 * @param {String} sku - sku del producto
 * @returns {Promise<Object>} producto encontrado
 * @throws {ServiceError} error con detalles del problema
 */
const findBySku = async (sku) => {
  try {
    //se busca el producto por sku
    const product = await productRepository.findBySku(sku);
    //si el producto existe se lanza una excepcion
    if (product)
      throw new ServiceError(
        "Producto ya ingresado",
        ProductCodes.INVALID_PRODUCT
      );
    //se retorna el producto
    return product;
  } catch (e) {
    //en caso de error se lanza una excepcion
    throw new ServiceError(
      e.message || "Internal server error while find product",
      e.code || ProductCodes.NOT_FOUND
    );
  }
};

/**
 * Servicio para buscar un producto por id
 *
 * @param {UUID} id - id del producto
 * @returns {Promise<Object>} producto encontrado
 * @throws {ServiceError} error con detalles del problema
 */
const findById = async (id) => {
  try {
    //se busca el producto por id
    const product = await productRepository.findById(id);
    //si no existe se lanza una excepcion
    if (!product)
      throw new ServiceError("Invalid product", ProductCodes.INVALID_PRODUCT);

    //se retorna el producto
    return product;
  } catch (e) {
    //en caso de error se lanza una excepcion
    throw new ServiceError(
      e.message || "Internal server error while find product",
      e.code || ProductCodes.NOT_FOUND
    );
  }
};

/**
 * Servicio para buscar todos los productos o por categoria
 *
 * @param {String} category - categoria de los productos a buscar (opcional)
 * @returns {Promise<Array<Object>>} array de productos
 * @throws {ServiceError} error con detalles del problema
 */
const findAll = async (category) => {
  try {
    //se genera un array vacio
    let products;

    //si no se envia una categoria se buscan todos los productos
    if (category)
      products = await productRepository.findAllByCategory(category);
    else products = await productRepository.findAll();
  
    //se retorna el array de productos
    return products;
  } catch (e) {
    //en caso de error se lanza una excepcion
    throw new ServiceError(
      e.message || "Internal server error while find product",
      e.code || ProductCodes.NOT_FOUND
    );
  }
};

/**
 * Servicio para eliminar un producto
 *
 * @param {UUID} id - id del producto
 * @returns {Promise<Object>} producto eliminado
 * @throws {ServiceError} error con detalles del problema
 */
const deleteProduct = async (id) => {
  const t = await productRepository.startTransaction();
  try {
    //se busca el producto por id
    await findById(id);
    //se elimina el producto
    const product = await productRepository.deleteProduct(id, t);

    //se confirma la transaccion
    //se retorna el producto eliminado
    await t.commit();
    return product;
  } catch (e) {
    //en caso de error se hace rollback de la transaccion
    //se lanza una excepcion
    await t.rollback();
    throw new ServiceError(
      e.message || "Internal server error while delete product",
      e.code || ProductCodes.NOT_FOUND
    );
  }
};

/**
 * Servicio para actualizar un producto
 * 
 * @param {UUID} id - id del producto
 * @param {Object} data - datos del producto a actualizar
 * @param {Array<Object>} variants - variantes del producto
 * @returns {Promise<Object>} producto actualizado
 * @throws {ServiceError} error con detalles del problema
 */
const updateProduct = async (id, data, variants) => {
  const t = await productRepository.startTransaction();
  try {
    //se busca el producto por id
    const product = await findById(id);
    //se actualiza el producto
    const productUpdated = await productRepository.updateProduct(id, data, t);
    //se actualizan las variantes del producto
    await variantsService.updateVariants(variants, t);

    //si se envia una nueva categoria se asigna al producto
    if (data.category) 
      await assingCategory(product, data.category, t);

    //se confirma la transaccion
    //se retorna el producto actualizado
    await t.commit();
    return productUpdated;
  } catch (e) {
    //en caso de error se hace rollback de la transaccion
    //se lanza una excepcion
    await t.rollback();
    throw new ServiceError(
      e.message || "Internal server error while update product",
      e.code || ProductCodes.NOT_FOUND
    );
  }
};

/**
 * Servicio para agregar productos al stock
 * 
 * @param {Array<Object>} items - productos a agregar al stock
 * @returns {Promise<Boolean>} true si todo fue exitoso
 * @throws {ServiceError} error con detalles del problema
 */
const addProducts = async (items) => {
  const t = await productRepository.startTransaction();
  try {
    //se agregan los productos al stock
    await variantsService.addProducts(items, t);

    //se confirma la transaccion
    //se retorna true si todo fue exitoso
    await t.commit();
    return true;
  } catch (e) {
    //en caso de error se hace rollback de la transaccion
    //se lanza una excepcion
    await t.rollback();
    throw new ServiceError(
      e.message || "Error al agregar productos",
      e.code || ProductCodes.NOT_FOUND
    );
  }
};

module.exports = {
  registerProduct,
  findById,
  findAll,
  deleteProduct,
  updateProduct,
  addProducts,
};
