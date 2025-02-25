const productRepository = require("../repositories/product.repository");
const categoryService = require("../services/category.service");
const variantsService = require("../services/product_variants.service");
const ProductCodes = require("../utils/errors/errorsCodes/product.codes");
const ServiceError = require("../utils/errors/service.error");

//FUNCION PARA REGISTRAR UN NUEVO PRODUCTO
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

//FUNCION PARA ASIGNAR UNA CATEGORIA A UN PRODUCTO
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

//FUNCION PARA BUSCAR UN PRODUCTO POR SKU
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

//FUNCION PARA BUSCAR UN PRODUCTO POR ID
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

//FUNCION PARA BUSCAR TODOS LOS PRODUCTOS
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

//FUNCION PARA ELIMINAR UN PRODUCTO
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

//FUNCION PARA ACTUALIZAR UN PRODUCTO
const updateProduct = async (id, data, variants) => {
  const t = await productRepository.startTransaction();
  try {
    //se busca el producto por id
    await findById(id);
    //se actualiza el producto
    const productUpdated = await productRepository.updateProduct(id, data, t);
    //se actualizan las variantes del producto
    await variantsService.updateVariants(variants, t);

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

//FUNCION PARA AGREGAR PRODUCTOS
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
