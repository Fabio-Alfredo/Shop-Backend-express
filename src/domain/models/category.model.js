/**
 * Modelo de la tabla category
 * 
 * Relaciones:
 * El modelo Category tiene una relacion de muchos a muchos con el modelo Product
 *
 * @typedef {Object} Category
 * @property {String} id - id de la categoria
 * @property {String} category - nombre de la categoria
 * @property {Date} createdAt - fecha de creacion
 * @property {Date} updatedAt - fecha de actualizacion
 */
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
      tableName: "category",
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
