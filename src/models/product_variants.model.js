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
