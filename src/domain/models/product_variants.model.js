
/**
 * Modelo de la tabla product_variants (variantes de los productos)
 *
 * Relaciones:
 * - El modelo Product_variants pertenece a un producto
 * - El modelo Product_variants tiene una relacion de muchos a muchos con el modelo Order
 * 
 * @typedef {Object} Product_variants
 * @property {UUID} id - id de la variante
 * @property {String} color - color de la variante
 * @property {String} size - tamaño de la variante
 * @property {Number} stock - stock de la variante
 * @property {Date} createdAt - fecha de creacion
 * @property {Date} updatedAt - fecha de actualizacion
 */
module.exports = (sequelize, DataTypes) => {
  const Product_variants = sequelize.define("Product_variants", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    color: { type: DataTypes.STRING },
    size: { type: DataTypes.STRING },
    stock: { type: DataTypes.INTEGER, allowNull: false },
  });

  Product_variants.associate = (models) => {

    Product_variants.belongsTo(models.Product,{
      foreignKey: "productId",
    })
    Product_variants.belongsToMany(models.Order, {
      through: models.Order_product,
      foreignKey: "productId",
    });
  };


  return Product_variants
};
