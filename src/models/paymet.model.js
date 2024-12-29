module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define(
    "Payment",
    {
      id: {
        type: DataTypes.UUID,
        defaulValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      method: {
        type: DataTypes.STRING,
        validator: {
          notEmpty: true,
        },
      },
      description: {
        type: DataTypes.STRING,
        validator: {
          notEmpty: true,
        },
      },
    },
    {
      timestamps: true,
      tableName: "payment",
    }
  );

  Payment.associate = (models)=>{
    Payment.belongsToMany(models.Order,{
        through:'payment_history',
        foreignKey:'paymentId'
    })
  }
  return Payment;
};
