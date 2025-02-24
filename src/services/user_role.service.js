const user_roleRepository = require("../repositories/user_role.repository");
const role = require("../utils/errors/errorsCodes/role.code");
const serviceError = require("../utils/errors/service.error");

const createRelation = async (userId, roleIds, editedBy, t) => {
  try {
    
    const relation = roleIds.map((roleId) => {
      return {
        roleId,
        userId,
        editedBy,
      };
    });
    await user_roleRepository.create(relation, t);
    return true;
  } catch (e) {
    throw new serviceError(e.message || "Internal server error", e.code || 500);
  }
};

const deleteRelation = async (userId, roleIds, editedBy, t) => {
  try {
    await user_roleRepository.deleteByUserIdAndRoleId(userId, roleIds, t);

    return true;
  } catch (e) {
    throw new serviceError(e.message || "Internal server error", e.code || 500);
  }
};

module.exports = {
  createRelation,
  deleteRelation,
};
