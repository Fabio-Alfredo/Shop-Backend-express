const userRepository = require("../repositories/user.repository");
const roleService = require("../services/role.service");
const user_roleService = require("../services/user_role.service");
const userCodes = require("../utils/errors/errorsCodes/user.codes");
const roleOperations = require("../utils/constants/operationRoles.util");
const ServiceError = require("../utils/errors/service.error");
const serviceError = require("../utils/errors/service.error");

const assignRole = async (action, roleIds, userId, editedBy) => {
  const t = await userRepository.startTransaction();
  try {

    const user = await findById(userId);
     await roleService.findAllByIds(roleIds);

    if (user.id == editedBy)
      throw new ServiceError(
        "Invalid action update your roles",
        userCodes.INVALID_ACTION
      );

    if (action === roleOperations.ADD_ROLE) {
      await user_roleService.createRelation( user.id,roleIds, editedBy, t);
    } else if (action === roleOperations.REMOVE_ROLE) {
      
      await user_roleService.deleteRelation( user.id, roleIds, editedBy, t);
    } else {
      throw new ServiceError("Invalid action", userCodes.INVALID_ACTION);
    }

    await t.commit();
    return true;
  } catch (e) {
    await t.rollback();
    throw new serviceError(
      e.message || "Internal server error",
      e.code || userCodes.NOT_FOUND
    );
  }
};

const findById = async (id, t) => {
  try {
    const user = await userRepository.findById(id, t);

    if (!user)
      throw new serviceError("Invalid data user", userCodes.USER_NOT_EXISTS);

    return user;
  } catch (e) {
    throw new serviceError(
      e.message || "Internal service error",
      e.code || userCodes.NOT_FOUND
    );
  }
};

const findAllByRole = async (roleId) => {
  try {
    let users = [];
    if (!roleId) users = await userRepository.findAll();
    else users = await userRepository.findAllByRol(roleId);

    return users;
  } catch (e) {
    throw new serviceError(
      e.message || "Internal service error",
      e.code || userCodes.NOT_FOUND
    );
  }
};

module.exports = {
  assignRole,
  findById,
  findAllByRole,
};
