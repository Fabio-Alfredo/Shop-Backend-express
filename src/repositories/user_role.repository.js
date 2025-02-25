const { User_role } = require("../domain/models");
const { Op } = require("sequelize");

//crea una relacion entre usuario y rol
const create = async (user_roles, t) => {
  const newUser_role = await User_role.bulkCreate(user_roles, {
    transaction: t,
  });
  return newUser_role;
};

//elimina una relacion entre usuario y rol
//por id de usuario y id de rol
const deleteByUserIdAndRoleId = async (userId, roleIds, t) => {
    console.log(userId, roleIds)
    console.log(t)
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
