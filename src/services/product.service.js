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

//Busca los productos por su sku
const getProductsMap = async (items)=>{
  const productSkus = items.map(item=>item.sku);
  const products = await productRepository.findAllBySku(productSkus);
  if (productSkus.length !== products.length)
    throw new ServiceError(
      "Algunos productos no estan disponibles",
      ProductCodes.INVALID_PRODUCT
    );

  
    return new Map(products.map((p)=>[p.sku, p]))
}

//Hace el nuevo calculo de los stock
const shopProduct = async (items, t) => {
  try {
    const products = await getProductsMap(items);

    await validateStock(items, products);

    const update = await updateStock(items, products,'buy',  t);

    return update;
  } catch (e) {
    throw new ServiceError(
      e.message || "Internal server error while find product",
      e.code || ProductCodes.NOT_FOUND
    );
  }
};

//agregar nuevos productos
const addProducts = async(items)=>{
  try{
    const products = await getProductsMap(items)
    await updateStock(items, products,'add',  t);
    return true;
  }catch(e){
    throw new ServiceError(
      e.message ||  "Internal server error while ",
      e.code || ProductCodes.NOT_FOUND
    )
  }
}

//Valida si todavia hay existencias del producto
const validateStock = async (items, productMap)=>{
  try{

    for (const item of items) {
      const product = productMap.get(item.sku);
      if (product.stock < item.quantity)
        throw new ServiceError(
          `Cantidad insuficiente de ${product.name} `,
          ProductCodes.INVALID_PRODUCT
        );
    }
    return true;
  }
    catch (e) {
        throw new ServiceError(
        e.message || "Internal server error while find product",
        e.code || ProductCodes.NOT_FOUND
        );
    }
}

//Hace cambios del campo stock de los productos
const updateStock = async (items, productMap, operation, t) => {
  try {
    const updatedProducts = items.map((item) => {
      const product = productMap.get(item.sku);
      if (!product) throw new ServiceError(`Producto con ID ${item.sku} no encontrado`, ProductCodes.NOT_FOUND);
      return {
        sku: product.sku,
        stock: operation === 'buy' ? product.stock - item.quantity : product.stock + item.quantity,
      };
    });

    return await productRepository.bulkUpdate(updatedProducts, t);;
  } catch (e) {
    throw new ServiceError(
        e.message || "Error interno al actualizar el stock",
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
  shopProduct,
  findAll,
  addProducts
};
