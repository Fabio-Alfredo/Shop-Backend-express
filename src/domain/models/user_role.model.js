
/**
 * Modelo de la tabla user_role (tabla intermedia)
 * 
 * @typedef {Object} User_role
 * @property {Date} assignedIn - fecha de asignacion
 * @property {UUID} editedBy - id del usuario que edito
 * @property {Date} createdAt - fecha de creacion
 * @property {Date} updatedAt - fecha de actualizacion
 */
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
