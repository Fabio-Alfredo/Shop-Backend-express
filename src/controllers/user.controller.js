const userService = require("../services/user.service");
const responseHandle = require("../handlers/response.handler");
const userCodes = require("../utils/errors/errorsCodes/user.codes");
const userDTO = require("../domain/dtos/user.dto");
const createHttpError = require("http-errors");

const assignRole = async (req, res, next) => {
  try {
    const { userId, roleIds, action} = req.body;
    const user = req.user;

    await userService.assignRole(action, roleIds, userId, user.id);
    return responseHandle(res, 201, "success", "role editado con exito");
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

const findUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userService.findById(id);
    return responseHandle(res, 200, "success", userDTO(user));
  } catch (e) {
    switch (e.code) {
      case userCodes.NOT_FOUND:
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

const findAll = async (req, res, next) => {
  try {
    const { roleId } = req.query || null;
    const users = await userService.findAllByRole(roleId);
    console.log(users);
    return responseHandle(
      res,
      200,
      "success",
      users.map((user) => userDTO(user))
    );
  } catch (e) {
    switch (e.code) {
      case userCodes.NOT_FOUND:
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
  findUserById,
  findAll,
};
