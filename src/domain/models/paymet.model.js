
/**
 * Modelos de la tabla payment
 * 
 * Relaciones:
 * - El modelo Payment tiene una relacion de muchos a muchos con el modelo Order
 * 
 * @typedef {Object} Payment
 * @property {UUID} id - id del pago 
 * @property {String} method - metodo de pago
 * @property {String} description - descripcion del metodo de pago
 * @property {Date} createdAt - fecha de creacion
 * @property {Date} updatedAt - fecha de actualizacion
 */
module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define(
    "Payment",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
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
