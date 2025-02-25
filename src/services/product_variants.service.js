const variantsRepository = require("../repositories/product_variants.repository");
const productCodes = require("../utils/errors/errorsCodes/product.codes");
const ServiceError = require("../utils/errors/service.error");
const {
  ADD_PRODUCT,
  REMOVE_PRODUCT,
} = require("../utils/constants/operationProduct.util");

//FUNCION PARA GUARDAR LAS VARIANTES DE UN PRODUCTO
const save = async (variants, productId, t) => {
  try {
    //se crea un array con las variantes a guardar 
    const saveVariants = variants.map((variant) => {
      return {
        color: variant.color,
        size: variant.size,
        stock: variant.stock,
        productId: productId,
      };
    });

    //se guardan las variantes
    //se retorna las variantes guardadas
    return await variantsRepository.save(saveVariants, t);
  } catch (e) {
    //en caso de error se lanza una excepcion
    throw new ServiceError(
      e.message || "Error in save variants",
      e.code || productCodes.NOT_FOUND
    );
  }
};

//FUNCION PARA RESERVAR PRODUCTOS
const reservationProducts = async (items, t) => {
  try {
    //se actualiza el stock de los productos
    await updateStock(items, REMOVE_PRODUCT, t);
    //se calcula el precio total de los productos
    const price = await calculateTotal(items, products);

    //se retorna el precio total
    return price;
  } catch (e) {
    //en caso de error se lanza una excepcion
    throw new ServiceError(
      e.message || "Error al crear la reservacion de productos",
      e.code || productCodes.NOT_FOUND
    );
  }
};

//FUNCION PARA ACTUALIZAR EL STOCK DE LOS PRODUCTOS
const updateStock = async (items, operation, t) => {
  try {
    //se obtienen los productos ya mappeados
    const products = await getProductsMap(items);

    //se actualiza el stock de los productos a partir de la operacion
    //se verifica si hay suficiente stock para la operacion
    //si no hay suficiente stock se lanza una excepcion
    const updateProducts = items.map((item) => {
      const product = products.get(item.id);
      if (!product || product.stock < item.quantity)
        throw new ServiceError(
          `EL roducto ${product.name} no tiene suficiente stock`,
          productCodes.NOT_FOUND
        );
      return {
        id: product.id,
        stock:
          operation === REMOVE_PRODUCT
            ? parseInt(product.stock) - item.quantity
            : parseInt(product.stock) + item.quantity,
      };
    });

    //se actualiza el stock de los productos
    await variantsRepository.bulkUpdateStock(updateProducts, t);

    //se retorna true si todo fue exitoso
    return true;
  } catch (e) {
    //en caso de error se lanza una excepcion
    throw new ServiceError(
      e.message || "Error al recalcular el stock2 ",
      e.code || productCodes.NOT_FOUND
    );
  }
};

//FUNCION PARA CALCULAR EL PRECIO TOTAL DE LOS PRODUCTOS
const calculateTotal = (items, products) => {
  //se calcula el precio total de los
  //productos a partir de la cantidad y el precio
  return items.reduce((acc, item) => {
    const product = products.get(item.id);
    return acc + product.Product.price * item.quantity;
  }, 0);
};

//FUNCION PARA AGREGAR PRODUCTOS
const addProducts = async (items, t) => {
  try {
    //se actualiza el stock de los productos para agregarlos
    await updateStock(items, ADD_PRODUCT, t);

    //se retorna true si todo fue exitoso
    return true;
  } catch (e) {
    //en caso de error se lanza una excepcion
    throw new ServiceError(
      e.message || "Error al agregar productos",
      e.code || productCodes.NOT_FOUND
    );
  }
};

//FUNCION PARA OBTENER LOS PRODUCTOS MAPPEADOS
const getProductsMap = async (items) => {
  //se crea un array con los ids de los productos
  const productIds = items.map((item) => item.id);

  //se verifica si los productos existen
  const products = await variantsRepository.findAllByIds(productIds);
  if (productIds.length != items.length) {
    throw new ServiceError(
      "Algunos productos no estan disponibles",
      productCodes.NOT_FOUND
    );
  }
  //se retorna un mapa con los productos
  return new Map(products.map((p) => [p.id, p]));
};

//FUNCION PARA ACTUALIZAR LAS VARIANTES DE LOS PRODUCTOS
const updateVariants = async (variants, t) => {
  try {
    //se verifica si los productos existen
    await getProductsMap(variants);
    //se actualizan las variantes de los productos
    for (const variant of variants) {
      await variantsRepository.udpateProducts(variant.id, variant, t);
    }

    //se retornan las variantes actualizadas
    return updateVariants;
  } catch (e) {
    //en caso de error se lanza una excepcion
    throw new ServiceError(
      e.message || "Error al actualizar los productos",
      e.code || productCodes.NOT_FOUND
    );
  }
};

module.exports = {
  save,
  reservationProducts,
  addProducts,
  updateVariants,
};
