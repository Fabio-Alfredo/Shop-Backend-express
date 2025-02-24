const { Product, Product_variants, Category } = require("../domain/models");

const startTransaction = async () => {
  const t = await Product.sequelize.transaction();
  return t;
};

const create = async (product, t) => {
  const newProduct = await Product.create(product, { transaction: t });
  return newProduct;
};

const findBySku = async (sku) => {
  console.log(sku);
  const product = await Product.findOne({ where: { sku } });
  return product;
};

const findById = async (id) => {
  const product = await Product.findOne({ where: { id } });
  return product;
};

const bulkUpdate = (products, t) => {
  return Product.bulkCreate(products, {
    updateOnDuplicate: ["stock"],
    transaction: t,
    where: { sku: products.map((products) => products.sku) },
  });
};

const findAll = async () => {
  const prducts = await Product.findAll({
    include: { model: Product_variants, as: "product_variants" },
  });
  return prducts || [];
};

const findAllByCategory = async (categoryId) => {
  const products = await Product.findAll({
    include: {
      model: Category,
      where: { id: categoryId },
      through: { attributes: [] },
    },
  });
  return products;
};

const findAllByIds = async (productIds) => {
  const products = Product.findAll({ where: { id: productIds } });
  return products;
};

const updateProducts = async (products, t) => {
  const productsUpdated = await Product.bulkCreate(products, {
    updateOnDuplicate: ["name", "description", "price"],
    transaction: t,
  });
  return productsUpdated;
};

const findAllBySku = async (skuProducts) => {
  const products = await Product.findAll({ where: { sku: skuProducts } });
  return products;
};

module.exports = {
  create,
  findById,
  bulkUpdate,
  findAll,
  findAllByIds,
  startTransaction,
  findBySku,
  findAllBySku,
  updateProducts,
  findAllByCategory,
};
