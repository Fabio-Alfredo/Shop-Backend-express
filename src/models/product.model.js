module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    id: {
      type: DataTypes.UUID,
      defaulValue: DataTypes.UUID,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmty: true,
        len: [3, 30],
      },
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        notEmpty: true,
        len: [10, 50],
      },
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
    },
    stok: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      validate: {
        notEmty: true,
      },
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
