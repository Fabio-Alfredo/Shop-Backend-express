const variantsRepository = require("../repositories/product_variants.repository");
const productCodes = require("../utils/errors/errorsCodes/product.codes");
const ServiceError = require("../utils/errors/service.error");

const save = async (variants, productId, t) => {
  try {
    const saveVariants = variants.map((variant) => {
      return {
        color: variant.color,
        size: variant.size,
        stock: variant.stock,
        productId: productId,
      };
    });

    return await variantsRepository.save(saveVariants, t);
  } catch (e) {
    throw new ServiceError(
      e.message || "Error in save variants",
      e.code || productCodes.NOT_FOUND
    );
  }
};

const reservationProducts = async (items, t) => {
  try {
    const products = await getProductsMap(items);
    // await validateStock(items, products);
    const update = await updateStock(items, products, t);
    return update;
  } catch (e) {
    throw new ServiceError(
      e.message || "Error al crear la reservacion de productos",
      e.code || productCodes.NOT_FOUND
    );
  }
};

const updateStock = async (items, products, t) => {
  try {
    const updateProducts = items.map((item) => {
      const product = products.get(item.id);
      if (!product || (item.quantity > 0 && item.quantity > product.stock))
        throw new ServiceError(
          `EL roducto ${product.name} no tiene suficiente stock`,
          productCodes.NOT_FOUND
        );
      return {
        id: product.id,
        stock: product.stock - item.quantity,
      };
    });

    await variantsRepository.bulkUpdateStock(updateProducts, t);
    const price = calculateTotal(items, products);
    
    return price;
  } catch (e) {
    throw new ServiceError(
      e.message || "Error al recalcular el stock2 ",
      e.code || productCodes.NOT_FOUND
    );
  }
};


const calculateTotal = (items, products) => {
  return items.reduce((acc, item) => {
    const product = products.get(item.id);
    return acc + product.Product.price * item.quantity;
  }, 0);
}

const addProducts = async (items, t) => {
  try {
    const products = await getProductsMap(items);

    await updateStock(items, products, "add", t);
    return true;
  } catch (e) {
    throw new ServiceError(
      e.message || "Error al agregar productos",
      e.code || productCodes.NOT_FOUND
    );
  }
};

const getProductsMap = async (items) => {
  const productIds = items.map((item) => item.id);
  const products = await variantsRepository.findAllByIds(productIds);
  if (productIds.length != items.length) {
    throw new ServiceError(
      "Algunos productos no estan disponibles",
      productCodes.NOT_FOUND
    );
  }
  return new Map(products.map((p) => [p.id, p]));
};

// const validateStock = async (items, products) => {
//   try {
//     for (const item of items) {
//       const product = products.get(item.id);
//       if (product.stock < item.quantity)
//         throw new ServiceError(
//           `Cantidad insuficiente de ${product.Product.name} ${product.color}`,
//           productCodes.OUT_OF_STOCK
//         );
//     }
//     return true;
//   } catch (e) {
//     throw new ServiceError(
//       e.message || "Error al calcular el stock 1",
//       e.coode || productCodes.NOT_FOUND
//     );
//   }
// };

module.exports = {
  save,
  reservationProducts,
  addProducts,
  updateStock,
};
