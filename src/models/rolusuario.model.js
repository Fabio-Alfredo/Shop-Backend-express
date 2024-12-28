const User = require("../models/user.model");
const Role = require("../models/role.model");

module.exports = (sequelize, DataTypes) => {
  const RoleUser = sequelize.define(
    "User_role",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      assignedIn: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      editedBy: {
        allowNull: false,
        type: DataTypes.UUID,
      },
    },
    {
      timestamps: true,
      tableName:'user_role'
    }
  );


  return RoleUser;
};
