const userService = require("../services/user.service");
const responseHandle = require("../handlers/response.handler");
const userCodes = require("../utils/errors/errorsCodes/user.codes");

const assignRole = async (req, res, next) => {
  try {
    const { userId, roleId } = req.body;
    const user = req.user;

    await userService.assignRole(roleId, userId, user.id);
    responseHandle(res, 201, "success", "role editado con exito");
  } catch (e) {
    switch (e.code) {
      case userCodes.NOT_FOUND:
        next(createHttpError(404, e.message));
        break;
      case userCodes.INVALID_ACTION:
        next(createHttpError(400, e.message));
        break;
      case userCodes.USER_NOT_EXISTS:
        next(createHttpError(404, e.message));
        break;
      default:
        next(e);
    }
  }
};

module.exports = {
  assignRole,
};
