
module.exports = (sequelize, DataTypes) => {
  const RoleUser = sequelize.define(
    "User_role",
    {
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
