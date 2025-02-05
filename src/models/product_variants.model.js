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

    Product_variants.hasMany(models.Product,{
      foreignKey: "productId",
      as: "products"
    })
  };


  return Product_variants
};
