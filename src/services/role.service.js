const roleRepository = require("../repositories/role.repository");
const serviceError = require("../utils/errors/service.error");
const roleCodes = require("../utils/errors/errorsCodes/role.code");

const findById = async (id) => {
  try {
    const role = await roleRepository.findById(id);
    if (!role)
      throw new serviceError(
        "Invalid role, not exists",
        roleCodes.ROLE_NOT_EXISTS
      );
    return role;
  } catch (e) {
    throw new serviceError(
      e.message || "Internal Service error",
      e.code || roleCodes.NOT_FOUND
    );
  }
};

const findAllByIds = async (ids) => {
  try {
    const roles = (await roleRepository.findAllByIds(ids)) || [];
    if (roles && roles.length !== ids.length) {
      throw new serviceError("Invalid roles", roleCodes.ROLE_NOT_EXISTS);
    }
    return roles;
  } catch (e) {
    throw new serviceError(
      e.message || "Internal Service error",
      e.code || roleCodes.NOT_FOUND
    );
  }
};

const findAll = async () => {
  try {
    const roles = (await roleRepository.findAll()) || [];
    return roles;
  } catch (e) {
    throw new serviceError(
      e.message || "Internal Service error",
      e.code || roleCodes.NOT_FOUND
    );
  }
};

module.exports = {
  findById,
  findAll,
  findAllByIds,
};
