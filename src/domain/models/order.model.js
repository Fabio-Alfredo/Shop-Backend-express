const ORDER_STATES = require("../../utils/constants/ordersState.utils");
const STATE_LIST = Object.values(ORDER_STATES);

/**
 * Modelo de la tabla orders
 * 
 * Relaciones:
 * - El modelo Order tiene una relacion de muchos a muchos con el modelo Product_variants 
 * - El modelo Order tiene una relacion de muchos a muchos con el modelo Payment
 * - El modelo Order pertenece a un usuario
 * 
 * @typedef {Object} Order
 * @property {UUID} id - id de la orden
 * @property {Number} total - total de la orden
 * @property {String} direction - direccion de la orden
 * @property {String} status - estado de la orden
 * @property {Date} createdAt - fecha de creacion
 * @property {Date} updatedAt - fecha de actualizacion
 */
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      total: {
        type: DataTypes.DECIMAL(10, 2),
      },
      direction: {
        type: DataTypes.STRING
      },
      status: {
        type: DataTypes.ENUM(STATE_LIST),
        defaultValue: ORDER_STATES.PENDING,
      },
    },
    {
      timestamps: true,
      tableName: "orders",
    }
  );

  Order.associate = (models) => {
    Order.belongsToMany(models.Product_variants, {
      through: models.Order_product,
      foreignKey: 'orderId',
    });

      Order.belongsToMany(models.Payment, {
        through: 'payment_history',
        foreignKey: 'orderId'
      })

    Order.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user"
    })

  };


  return Order;
};
