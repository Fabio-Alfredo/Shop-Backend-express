
module.exports = (sequelize, DataTypes) => {
  const User_role = sequelize.define(
    "User_role",
    {
      assignedIn: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      editedBy: {
        type: DataTypes.UUID,
      },
    },
    {
      timestamps: true,
      tableName:'user_role'
    }
  );


  return User_role;
};
