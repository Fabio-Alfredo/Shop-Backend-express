const bcrypt = require("bcryptjs");
const config = require("../config/config").production;

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
          notEmpty: true,
        },
        unique: true,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
          len: [6, 10],
        },
      },
    },
    {
      timestamps: true,
      tableName: "users",
    }
  );

  User.beforeSave(async (user, options) => {
    if (user.changed("password")) {
      user.password = await bcrypt.hash(user.password, parseInt(config.salt));
    }
  });

  User.prototype.validatePassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };

  User.associate = (models) => {
    User.belongsToMany(models.Role, {
      through: models.User_role, // Usar el modelo UserRole como la tabla intermedia
      foreignKey: "userId",
    });
  };

  return User;
};
