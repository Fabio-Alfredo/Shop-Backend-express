const productService = require("../services/product.service");
const createHttpError = require("http-errors");
const ProductCodes = require("../utils/errors/errorsCodes/product.codes");

const registerProduct = async (req, res, next) => {
  try {
    const product = req.body;
    const newProduct = await productService.registerProduct(product);
    res.status(201).json(newProduct);
  } catch (e) {
    switch (e.code) {
      case ProductCodes.NOT_FOUND:
        next(createHttpError(500, e.message));
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
    next(e);
  }
}

const findProductById = async (req, res, next) => {
  try {
    const { id } = req.params
    const product = await productService.findById(id);
    res.status(200).json(product);
  } catch (e) {

  }
}

module.exports = { registerProduct, findAllProducts, findProductById }
