const productImagesRepository = require("../repositories/product_images.repository");
const ServiceError = require("../utils/errors/service.error");
const ProductCodes = require("../utils/errors/errorsCodes/product.codes");

/**
 * Servicio para crear una nueva imagen de producto
 *
 * @param {Array<Object>} images - imagenes del producto a registrar
 * @param {object} t - transaccion de la base de datos
 * @returns {Promise<Array<Object>>} imagenes creadas
 * @throws {ServiceError} error con detalles del problema
 */
const createImage = async (images, product_id, t) => {
  try {
    if (!images || !images.length)
      throw new ServiceError(
        "Se requiere al menos una imagen para el producto",
        ProductCodes.INVALID_PRODUCT
      );

    const imagesWithProductId = images.map((image) => {
      return {
        url: image,
        product_id: product_id,
      };
    });
    //se crea un nuevo producto
    const imagesUrls = await productImagesRepository.create(
      imagesWithProductId,
      t
    );
    return imagesUrls;
  } catch (e) {
    throw new ServiceError(
      e.message || "Internal Service error",
      e.code || ProductCodes.NOT_FOUND
    );
  }
};

/**
 * Servicio para buscar las imagenes de un producto
 *
 * @param {number} productId - id del producto
 * @returns {Promise<Array<Object>>} imagenes del producto
 * @throws {ServiceError} error con detalles del problema
 */
const findByProductId = async (productId) => {
  try {
    const images = await productImagesRepository.findByProduct(productId);
    return images;
  } catch (e) {
    throw new ServiceError(
      e.message || "Internal Service error",
      e.code || ProductCodes.NOT_FOUND
    );
  }
};

module.exports = {
  createImage,
  findByProductId,
};
