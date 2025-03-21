const bcrypt = require("bcryptjs");
const config = require("../../configs/config");

/**
 * Modelo de la tabla users
 * 
 * Relaciones:
 * - El modelo User tiene una relacion de muchos a muchos con el modelo Role
 * - El modelo User tiene una relacion de uno a muchos con el modelo Order
 * 
 * @typedef {Object} User
 * @property {UUID} id - id del usuario
 * @property {String} name - nombre del usuario
 * @property {String} email - correo del usuario
 * @property {String} password - contraseña del usuario
 * @property {Date} createdAt - fecha de creacion
 * @property {Date} updatedAt - fecha de actualizacion
 */
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        allowNull: {
          args: false,
          msg: "Id requerido",
        },
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Nombre requerido",
          },
        },
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            args: true,
            msg: "Correo invalido",
          },
          notEmpty: {
            args: true,
            msg: "Correo requerido",
          },
        },
        unique: {
          args: true,
          msg: 'correo en uso'
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Contraseña requerida",
          },
          len: {
            args: [6, 255],
            msg: "Contraseña debe tener al menos 6 caracteres",
          },
        },
      },
    },
    {
      timestamps: true,
      tableName: "users",
    }
  );

  // Hooks
  // Antes de guardar el usuario, hashear la contraseña
  User.beforeSave(async (user, options) => {
    if (user.changed("password")) {
      user.password = await bcrypt.hash(user.password, parseInt(config.salt));
    }
  });

  // Metodos
  // Validar contraseña
  User.prototype.validatePassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };

  User.associate = (models) => {
    User.belongsToMany(models.Role, {
      through: models.User_role,
      foreignKey: "userId"
    });

    User.hasMany(models.Order, {
      foreignKey: "userId",
      as: "orders"
    })
  };


  return User;
};
