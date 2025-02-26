const productService = require("../services/product.service");
const createHttpError = require("http-errors");
const ProductCodes = require("../utils/errors/errorsCodes/product.codes");
const categoryCodes = require("../utils/errors/errorsCodes/category.codes");
const responseHandler = require("../handlers/response.handler");

//CONTROLADOR PARA REGISTRAR UN NUEVO PRODUCTO
const registerProduct = async (req, res, next) => {
  try {
    //se obtiene la data del producto
    const { sku, name, description, price, stock, variants, category } =
      req.body;

    //se crea el producto
    const newProduct = await productService.registerProduct(
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

//CONTROLADOR PARA ACTUALIZAR LA DATA DE UN PRODUCTO
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

//CONTROLADOR PARA OBTENER TODOS LOS PRODUCTOS
const findAllProducts = async (req, res, next) => {
  try {
    //se obtiene la categoria de los productos
    const { category } = req.query || null;
    //se obtienen los productos
    const products = await productService.findAll(category);
    //se retornan los productos
    return responseHandler(res, 200, "success", products);
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

//CONTROLADOR PARA OBTENER UN PRODUCTO POR ID
const findProductById = async (req, res, next) => {
  try {
    //se obtiene el id del producto
    const { id } = req.params;
    //se busca el producto por id
    const product = await productService.findById(id);
    //se retorna el producto
    return responseHandler(res, 200, "success", product);
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

//CONTROLADOR PARA ELIMINAR UN PRODUCTO
const deleteProduct = async (req, res, next) => {
  try {
    //se obtiene el id del producto
    const { id } = req.params;
    //se elimina el producto
    await productService.deleteProduct(id);
    //se retorna un mensaje de exito
    return responseHandler(res, 204, "Product deleted");
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

//CONTROLADOR PARA AGREGAR PRODUCTOS
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
