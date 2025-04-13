module.exports = (sequelize, DataTypes) => {
  const Product_images = sequelize.define(
    "Product_images",
    {
      id: {
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      url: {
        type: DataTypes.STRING,
      },
      product_id: {
        type: DataTypes.UUID,
      },
    },
    {
      tableName: "product_images",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  Product_images.associate = (models) => {
    Product_images.belongsTo(models.Product, {
      foreignKey: "product_id",
      as: "product",
    });
  };

  return Product_images;
};
