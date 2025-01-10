const productRepoditory = require("../repositories/product.repository");
const categoryService = require("../services/category.service");
const ProductCodes = require("../utils/errorsCodes/product.codes");
const ServiceError = require("../errors/service.error");

const registerProduct = async (product) => {
  try {
    const newProduct = await productRepoditory.create(product);
    const category = await categoryService.findById(product.category);

    if (category) {
      await newProduct.setCategories([category]);
    }
    return newProduct;
  } catch (e) {
    throw new ServiceError(
      e.message || "Internal server error while create product",
      e.code || ProductCodes.NOT_FOUND
    );
  }
};

const findById = async (id) => {
  try {
    const product = await productRepoditory.findById(id);
    if (!product)
      throw new ServiceError("Invalid product", ProductCodes.INVALID_PRODUCT);
    return product;
  } catch (e) {
    throw new ServiceError(
      e.message || "Internal server error while find product",
      e.code || ProductCodes.NOT_FOUND
    );
  }
};

const shopProduct = async (items) => {
  try {
    const productIds = items.map((item) => item.id);
    const products = await productRepoditory.findAll(productIds);
    if (productIds.length != products.length)
      throw new ServiceError(
        "Algunos productos no estan disponibles",
        ProductCodes.INVALID_PRODUCT
      );

    let total;
    items.forEach((item) => {
      const product = item.products((p) => p.id === item.id);
      if (product.stock < item.quantity)
        throw new ServiceError(
          "Cantidad insuficiente ",
          ProductCodes.INVALID_PRODUCT
        );
      total += product.price * item.quantity;
    });
    
    // TODO:falta completar estsa logica
    console.log(total);
    return total
  } catch (e) {
    throw new ServiceError(
      e.message || "Internal server error while find product",
      e.code || ProductCodes.NOT_FOUND
    );
  }
};

module.exports = {
  registerProduct,
  findById,
};
