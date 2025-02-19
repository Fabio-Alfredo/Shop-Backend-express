const productService = require("../services/product.service");
const createHttpError = require("http-errors");
const ProductCodes = require("../utils/errors/errorsCodes/product.codes");
const categoryCodes = require("../utils/errors/errorsCodes/category.codes");
const responseHandler = require("../handlers/response.handler");

const registerProduct = async (req, res, next) => {
  try {
    const { sku, name, description, price, stock, variants, category } =
      req.body;

    const newProduct = await productService.registerProduct(
      sku,
      name,
      description,
      price,
      stock,
      variants,
      category
    );
    return responseHandler(res, 201, "Product created", newProduct);
  } catch (e) {
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

const findAllProducts = async (req, res, next) => {
  try {
    const products = await productService.findAll();
    res.status(200).json(products);
  } catch (e) {
    switch(e.code){
      case ProductCodes.NOT_FOUND:
        next(createHttpError(500, e.message));
        break;
      default:
        next(e);
    }
  }
};

const findProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productService.findById(id);
    res.status(200).json(product);
  } catch (e) {
    switch(e.code){
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

module.exports = { registerProduct, findAllProducts, findProductById };
