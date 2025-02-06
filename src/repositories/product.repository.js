const { Product, Product_variants } = require("../models");

const startTransaction = async () => {
  const t = await Product.sequelize.transaction();
  return t;
};

const create = async (product, t) => {
  const newProduct = await Product.create(product, {transaction:t });
  return newProduct;
};

const findBySku = async (sku)=>{
  console.log(sku)
  const product = await Product.findOne({where:{sku}});
  return product;
}

const findById = async (id) => {
  const product = await Product.findOne({ where: { id } });
  return product;
};

const bulkUpdate = (products, t) => {
  return Product.bulkCreate(products, { updateOnDuplicate:['stock'], transaction: t });
}

const findAll = async () => {
  const prducts = await Product.findAll({include:{model:Product_variants, as:'product_variants'}});
    return prducts || [];
}

const findAllByIds = async (productIds) => {
  const products = Product.findAll({ where: { id: productIds } });
  return products;
};

module.exports = {
  create,
  findById,
  bulkUpdate,
  findAll,
  findAllByIds,
  startTransaction,
  findBySku
};
