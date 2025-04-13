/**
 * Modelos de la tabla product
 *
 * Relaciones:
 * - El modelo Product tiene una relacion de muchos a muchos con el modelo Category
 * - El modelo Product tiene una relacion de uno a muchos con el modelo Product_variants
 *
 * @typedef {Object} Product
 * @property {UUID} id - id del producto
 * @property {String} sku - sku del producto
 * @property {String} name - nombre del producto
 * @property {String} description - descripcion del producto
 * @property {Number} price - precio del producto
 * @property {Boolean} status - estado del producto
 * @property {Date} createdAt - fecha de creacion
 * @property {Date} updatedAt - fecha de actualizacion
 */
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      id: {
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      sku: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: "products",
      timestamps: true,
    }
  );
  Product.associate = (models) => {
    Product.belongsToMany(models.Category, {
      through: "category_products",
      foreignKey: "productId",
    });
    Product.hasMany(models.Product_variants, {
      foreignKey: "productId",
      as: "product_variants",
    });
    Product.hasMany(models.Product_images, {
      foreignKey: "product_id",
      as: "images",
    });
  };

  return Product;
};
