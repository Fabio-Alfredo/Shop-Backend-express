module.exports = (sequelize, DataTypes) => {
  const Products_images = sequelize.define(
    "Priducts_images",
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
      tableName: "products_images",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

    Products_images.associate = (models) => {
        Products_images.belongsTo(models.Product, {
        foreignKey: "product_id",
        as: "product",
        });
    };
};
