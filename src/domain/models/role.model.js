module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    "Role",
    {
      id: {
        allowNull: false,
        type: DataTypes.STRING,
        primaryKey: true,
      },
      rol: {
        allowNull: true,
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      timestamps: true,
      tableName: "roles",
    }
  );
  Role.associate = (models) => {
    Role.belongsToMany(models.User, {
      through: models.User_role, // Usar el modelo UserRole como la tabla intermedia
      foreignKey: "roleId",
    });
  };
  return Role;
};
