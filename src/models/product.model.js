module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    id: {
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
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
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });
  Product.associate = (models) => {
    Product.belongsToMany(models.Category, {
      through: "category_products",
      foreignKey: "productId",
    });
    Product.belongsToMany(models.Order, {
      through: models.Order_product,
      foreignKey: "productId",
    });
  };

  return Product;
};
