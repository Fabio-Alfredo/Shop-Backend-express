const { User_role } = require("../domain/models");
const { Op } = require("sequelize");

/**
 * Crea una nueva relacion entre usuario y roles
 *
 * @param {array[]} user_roles - datos de las relaciones
 * @param t - transaccion
 * @returns {Promise<*>} relaciones creadas
 */
const create = async (user_roles, t) => {
  const newUser_role = await User_role.bulkCreate(user_roles, {
    transaction: t,
  });
  return newUser_role;
};

/**
 * Elimina una relacion entre usuario y roles
 *
 * @param {UUID} userId - id del usuario
 * @param {array[]} roleIds - ids de los roles
 * @param t - transaccion
 * @returns {Promise<*>} confirmacion de eliminacion
 */
const deleteByUserIdAndRoleId = async (userId, roleIds, t) => {

  const deletedRelation = await User_role.destroy({
    where: {
      userId,
      roleId: { [Op.in]: roleIds },
    },
    transaction: t,
  });
  return deletedRelation;
};

module.exports = {
  create,
  deleteByUserIdAndRoleId,
};
