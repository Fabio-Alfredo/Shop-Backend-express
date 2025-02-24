const { User_role } = require("../domain/models");
const { Op } = require("sequelize");

const create = async (user_roles, t) => {
  const newUser_role = await User_role.bulkCreate(user_roles, {
    transaction: t,
  });
  return newUser_role;
};

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
