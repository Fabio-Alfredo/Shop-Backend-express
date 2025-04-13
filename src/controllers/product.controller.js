const productService = require("../services/product.service");
const createHttpError = require("http-errors");
const ProductCodes = require("../utils/errors/errorsCodes/product.codes");
const categoryCodes = require("../utils/errors/errorsCodes/category.codes");
const responseHandler = require("../handlers/response.handler");
const productDto = require("../domain/dtos/product.dto");

/**
 * Controlador para registrar un nuevo producto
 *
 * @param {object} req - datos del producto a registrar
 * @param {object} res - respuesta con el producto creado
 * @param {object} next - middleware para manejar errores
 * @returns {object} respuesta con el producto creado
 */
const registerProduct = async (req, res, next) => {
  try {
    //se obtiene la data del producto
    const { sku, name, description, price, stock, variants, category } =
      req.body;
    const images = req.files;
    //se crea el producto
    const newProduct = await productService.registerProduct(
      images,
      sku,
      name,
      description,
      price,
      stock,
      variants,
      category
    );

    //se retorna el producto creado
    return responseHandler(res, 201, "Product created", newProduct);
  } catch (e) {
    //en caso de error se lanza una excepcion adecuada al error
    switch (e.code) {
      case ProductCodes.NOT_FOUND:
        next(createHttpError(500, e.message));
        break;
      case categoryCodes.NOT_FOUND:
        next(createHttpError(500, e.message));
        break;
      case ProductCodes.INVALID_PRODUCT:
        next(createHttpError(400, e.message));
        break;
      default:
        next(e);
    }
  }
};

/**
 * Controlador para actualizar la data de un producto
 *
 * @param {object} req - datos del producto a actualizar y el id del producto
 * @param {object} res - respuesta con el producto actualizado
 * @param {object} next - middleware para manejar errores
 * @returns {object} respuesta con el producto actualizado
 */
const updateDataProduct = async (req, res, next) => {
  try {
    //se obtiene la data y las variantes del producto
    //se obtiene el id del producto
    const { variants, ...productData } = req.body;
    const { id } = req.params;
    //se actualiza el producto
    await productService.updateProduct(id, productData, variants);
    //se busca el producto actualizado
    const product = await productService.findById(id);
    //se retorna el producto actualizado
    return responseHandler(res, 200, "Product updated", product);
  } catch (e) {
    //en caso de error se lanza una excepcion adecuada al error
    switch (e.code) {
      case ProductCodes.NOT_FOUND:
        next(createHttpError(500, e.message));
        break;
      default:
        next(e);
    }
  }
};

/**
 * Controlador para obtener todos los productos
 *
 * @param {object} req - datos de la categoria de los productos a obtener (opcional)
 * @param {object} res - respuesta con los productos
 * @param {object} next - middleware para manejar errores
 * @returns {object} respuesta con los productos
 */
const findAllProducts = async (req, res, next) => {
  try {
    //se obtiene la categoria de los productos
    const { category } = req.query || null;
    //se obtienen los productos
    const products = await productService.findAll(category);
    //se retornan los productos
    return responseHandler(
      res,
      200,
      "success",
      products.map((product) => productDto(product)) || []
    );
  } catch (e) {
    //en caso de error se lanza una excepcion adecuada al
    switch (e.code) {
      case ProductCodes.NOT_FOUND:
        next(createHttpError(500, e.message));
        break;
      default:
        next(e);
    }
  }
};

/**
 * Controlador para buscar un producto por id
 *
 * @param {object} req - id del producto a buscar
 * @param {object} res - respuesta con el producto encontrado
 * @param {object} next - middleware para manejar errores
 * @returns {object} respuesta con el producto encontrado
 */
const findProductById = async (req, res, next) => {
  try {
    //se obtiene el id del producto
    const { id } = req.params;
    //se busca el producto por id
    const product = await productService.findById(id);
    //se retorna el producto
    return responseHandler(res, 200, "success", productDto(product));
  } catch (e) {
    //en caso de error se lanza una excepcion adecuada al error
    switch (e.code) {
      case ProductCodes.NOT_FOUND:
        next(createHttpError(500, e.message));
        break;
      case ProductCodes.INVALID_PRODUCT:
        next(createHttpError(400, e.message));
        break;
      default:
        next(e);
    }
  }
};

/**
 * Controlador para eliminar un producto
 *
 * @param {object} req - id del producto a eliminar
 * @param {object} res - respuesta de exito
 * @param {object} next - middleware para manejar errores
 * @returns {object} respuesta de exito
 */
const deleteProduct = async (req, res, next) => {
  try {
    //se obtiene el id del producto
    const { id } = req.params;
    //se elimina el producto
    await productService.deleteProduct(id);
    //se retorna un mensaje de exito
    return responseHandler(res, 200, "Product deleted");
  } catch (e) {
    //en caso de error se lanza una excepcion adecuada al error
    switch (e.code) {
      case ProductCodes.NOT_FOUND:
        next(createHttpError(500, e.message));
        break;
      case ProductCodes.INVALID_PRODUCT:
        next(createHttpError(400, e.message));
        break;
      default:
        next(e);
    }
  }
};

/**
 * Controlador para agregar productos
 *
 * @param {object} req - informacion de los productos a agregar
 * @param {object} res - respuesta de exito
 * @param {object} next - middleware para manejar errores
 * @returns {object} respuesta de exito
 */
const addProducts = async (req, res, next) => {
  try {
    //se obtienen los productos a agregar
    const { items } = req.body;
    //se agregan los productos
    await productService.addProducts(items);
    //se retorna un mensaje de exito
    return responseHandler(res, 201, "Products added");
  } catch (e) {
    //en caso de error se lanza una excepcion adecuada al error
    switch (e.code) {
      case ProductCodes.NOT_FOUND:
        next(createHttpError(500, e.message));
        break;
      case ProductCodes.INVALID_PRODUCT:
        next(createHttpError(400, e.message));
        break;
      default:
        next(e);
    }
  }
};

module.exports = {
  registerProduct,
  findAllProducts,
  findProductById,
  updateDataProduct,
  deleteProduct,
  addProducts,
};
