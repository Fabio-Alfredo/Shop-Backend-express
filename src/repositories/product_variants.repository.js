const { Product_variants, Product } = require("../models");

const save = async (variants, t) => {
  const saveVariants = await Product_variants.bulkCreate(variants, {
    transaction: t,
  });
  return saveVariants;
};

const findAllByIds = async (ids) => {
  const products = await Product_variants.findAll({ where: { id: ids }, include:{model:Product} });
  return products
};

const bulkUpdateStock = async (products, t)=>{
    const _products = await Product_variants.bulkCreate(products, {updateOnDuplicate:['stock'], transaction:t})
    return _products
}

module.exports = {
  save,
  findAllByIds,
  bulkUpdateStock
};
