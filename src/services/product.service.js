const productRepoditory = require("../repositories/product.repository");
const categoryService = require("../services/category.service");
const ProductCodes = require("../utils/errorsCodes/product.codes");
const ServiceError = require("../errors/service.error");

const registerProduct = async (product) => {
  const t = await productRepoditory.startTransaction();
  try {
    const category = await categoryService.findById(product.category);

    const newProduct = await productRepoditory.create(product, t);

    if (category) {
      await newProduct.setCategories([category]);
    }

    await t.commit();
    return newProduct;
  } catch (e) {
    await t.rollback();
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

const shopProduct = async (items, t) => {
  try {
    const productIds = items.map((item) => item.id);

    const products = await productRepoditory.findAllByIds(productIds);

    if (productIds.length !== products.length)
      throw new ServiceError(
        "Algunos productos no estan disponibles",
        ProductCodes.INVALID_PRODUCT
      );

    let total = 0;
    for (const item of items) {
      const product = products.find((p) => p.id === item.id);
      if (product.stock < item.quantity)
        throw new ServiceError(
          `Cantidad insuficiente de ${product.name} `,
          ProductCodes.INVALID_PRODUCT
        );

      total += product.price * item.quantity;
      product.stock -= item.quantity;

      await productRepoditory.update(product, t);
    }

    return total;
  } catch (e) {
    throw new ServiceError(
      e.message || "Internal server error while find product",
      e.code || ProductCodes.NOT_FOUND
    );
  }
};

const findAll = async () => {
    try {
        const products = await productRepoditory.findAll();
        return products;
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
  shopProduct,
  findAll
};
