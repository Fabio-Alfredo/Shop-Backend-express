const productRepository = require("../repositories/product.repository");
const categoryService = require("../services/category.service");
const variantsService = require("../services/product_variants.service");
const ProductCodes = require("../utils/errors/errorsCodes/product.codes");
const ServiceError = require("../utils/errors/service.error");

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
    await findBySku(sku);

    const product = await productRepository.create(
      { sku, name, description, price, stock },
      t
    );

    await variantsService.save(variants, product.id, t);
    await assingCategory(product, category, t);

    await t.commit();
    return product;
  } catch (e) {
    await t.rollback();
    throw new ServiceError(
      e.message || "Internal server error while create product",
      e.code || ProductCodes.NOT_FOUND
    );
  }
};

const assingCategory = async (product, categoryId, t) => {
  try {
    const category = await categoryService.findById(categoryId);
    if (category) {
      await product.setCategories([categoryId], { transaction: t });
    }
    return product;
  } catch (e) {
    throw new ServiceError(
      e.message || "Internalserver error while assign category",
      e.code || ProductCodes.NOT_FOUND
    );
  }
};

const findBySku = async (sku) => {
  try {
    const product = await productRepository.findBySku(sku);
    if (product)
      throw new ServiceError(
        "Producto ya ingresado",
        ProductCodes.INVALID_PRODUCT
      );
    return product;
  } catch (e) {
    throw new ServiceError(
      e.message || "Internal server error while find product",
      e.code || ProductCodes.NOT_FOUND
    );
  }
};

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

// const updateProducts = async (id, productData, variants) => {
//   const t = await productRepository.startTransaction();
//   try{
//     const product = await findById(id);

//     const updateProducts = await productRepository.updateProducts(productData, t);

//     if(variants && variants.length > 0)
//       await variantsService.updateStock(variants,'add' t);

//     if(productData.category)
//       await assingCategory(product, productData.category, t);

//     await t.commit();
//     return updateProducts;
//   }catch(e){
//     await t.rollback();
//     throw new ServiceError(
//       e.message || "Internal server error while update product",
//       e.code || ProductCodes.NOT_FOUND
//     );
//   }
// }

const findAll = async (category) => {
  try {
    let products;

    if (category)
      products = await productRepository.findAllByCategory(category);
    else 
      products = await productRepository.findAll();
    
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
