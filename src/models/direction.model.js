const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Direction = sequelize.define(
    "Direction",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      addres: {
        type: DataTypes.STRING,
        validator: {
          notEmty: true,
          len: [10, 50],
        },
      },
      city: {
        type: DataTypes.STRING,
        validator: {
          notEmty: true,
          len: [3, 50],
        },
      },
    },
    { timestamps: true, tableName: "direction" }
  );

  Direction.associate=(models)=>{
    Direction.hasMany(models.Order,{
        foreignKey:'directionId',
        as:'orders'
    })
  }

  return Direction;
};
