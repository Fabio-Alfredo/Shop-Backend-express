const productRepository = require("../repositories/product.repository");
const categoryService = require("../services/category.service");
const variantsService = require('../services/product_variants.service');
const ProductCodes = require("../utils/errors/errorsCodes/product.codes");
const ServiceError = require("../utils/errors/service.error");


const   registerProduct = async (sku, name, description, price, stock, variants, category) => {
  const t = await productRepository.startTransaction();
  try {

    await findBySku(sku);

    const existCategory = await categoryService.findById(category);
    const product = await productRepository.create({sku, name, description, price, stock}, t)
     await variantsService.save(variants, product.id, t);

    if (existCategory) {
      await product.setCategories([category], { transaction: t });
    }

    await t.commit();
    return product;
  } catch (e) {
    console.log(e)
    await t.rollback();
    throw new ServiceError(
      e.message || "Internal server error while create product",
      e.code || ProductCodes.NOT_FOUND
    );
  }
};

const findBySku = async (sku)=>{
  try{
    const product = await productRepository.findBySku(sku);
    if (product)
      throw new ServiceError("Producto ya ingresado", ProductCodes.INVALID_PRODUCT);
    return product;
  }catch(e){
    throw new ServiceError(
      e.message || "Internal server error while find product",
      e.code || ProductCodes.NOT_FOUND
    );
  }
}

const findById = async (id) => {
  try {
    const product = await productRepository.findById(id);
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


const findAll = async () => {
    try {
        const products = await productRepository.findAll();
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
  findAll,

};
