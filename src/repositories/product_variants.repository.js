const { Product_variants, Product } = require("../domain/models");

//guarda las variantes de un producto
const save = async (variants, t) => {
  const saveVariants = await Product_variants.bulkCreate(variants, {
    transaction: t,
  });
  return saveVariants;
};

//busca las variantes de un producto por id
//incluye el producto al que pertenece
const findAllByIds = async (ids) => {
  const products = await Product_variants.findAll({
    where: { id: ids },
    include: { model: Product },
  });
  return products;
};

//actualiza el stock de las variantes de un producto
const bulkUpdateStock = async (products, t) => {
  const _products = await Product_variants.bulkCreate(products, {
    updateOnDuplicate: ["stock"],
    transaction: t,
  });
  return _products;
};

//actualiza los datos de las variantes de un producto
const udpateProducts = async (id, product, t) => {
  const updateProducts = await Product_variants.update(product, {
    where: { id },
    transaction: t,
  });
  return updateProducts;
};

module.exports = {
  save,
  findAllByIds,
  bulkUpdateStock,
  udpateProducts,
};
