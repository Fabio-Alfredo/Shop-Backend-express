const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Category = sequelize.define(
    "Category",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmty: true,
          notNull: true,
        },
      },
    },
    {
      timestamp: true,
      tableName: "categories",
    }
  );
  Category.associate = (models)=>{
    Category.belongsToMany(models.Product, {
        through:'category_products',
        foreignKey:'categoryId'
    })
  }

  return Category;
};
