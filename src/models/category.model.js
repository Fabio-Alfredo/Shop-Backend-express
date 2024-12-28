module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      category: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: true,
      tableName: "categories",
    }
  );
  Category.associate = (models) => {
    Category.belongsToMany(models.Product, {
      through: "category_products",
      foreignKey: "categoryId",
    });
  };

  return Category;
};
