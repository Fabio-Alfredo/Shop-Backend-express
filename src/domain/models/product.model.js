module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    id: {
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    sku:{
      allowNull:false,
      type:DataTypes.STRING,
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
  });
  Product.associate = (models) => {
    Product.belongsToMany(models.Category, {
      through: "category_products",
      foreignKey: "productId",
    });
    Product.hasMany(models.Product_variants,{
      foreignKey: "productId",
      as:"product_variants"
    })
  };

  return Product;
};
