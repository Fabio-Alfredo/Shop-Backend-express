const { Product_images } = require("../domain/models");

const create = async (images, t) => {
  const newImage = await Product_images.bulkCreate(images, {transaction: t});
  return newImage;
};

const findByProduct = async (productId) => {
  const images = await Product_images.findAll({
    where: { product_id: productId },
  });
  return images;
};

module.exports = {
  create,
  findByProduct,
};
