const productRepoditory = require("../repositories/product.repository");
const ProductCodes = require("../utils/errorsCodes/product.codes");
const ServiceError = require("../errors/service.error");

const registerProduct = async (product) => {
  try {
    const newProduct = await productRepoditory.create(product);
    return newProduct;
  } catch (e) {
    throw new ServiceError(
      e.message || "Internal server error while create product",
      e.code || ProductCodes.NOT_FOUND
    );
  }
};

module.exports = {
  registerProduct,
};
