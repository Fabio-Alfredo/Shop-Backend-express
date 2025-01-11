const ORDER_STATES = require("../utils/constants/ordersState.utils");

const STATE_LIST = Object.values(ORDER_STATES);

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
      direction:{
        type:DataTypes.STRING
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
    Order.belongsToMany(models.Product, {
      through: models.Order_product, 
      foreignKey: 'orderId', 
    });

    Order.belongsToMany(models.Payment,{
      through:'payment_history',
      foreignKey:'orderId'
    })

  };


  return Order;
};