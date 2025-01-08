const productService = require("../services/product.service");
const createHttpError = require("http-errors");
const ProductCodes = require("../utils/errorsCodes/product.codes");

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

module.exports = {registerProduct}
