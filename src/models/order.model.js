const DataTypes = require("sequelize").DataTypes;
const { Model } = require("sequelize");
const ORDER_STATES = require("../utils/constants/ordersState.utils");

const STATE_LIST = Object.values(ORDER_STATES);

module.exports = (sequelize) => {
  const Order = sequelize.define(
    "Order",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      total: {
        type: DataTypes.DECIMAL,
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
      foreignKey: "orderId", 
    });

    Order.belongsTo(models.Direction,{
      foreignKey:'orderId',
      as: 'directions',  
    })

  };


  return Order;
};
