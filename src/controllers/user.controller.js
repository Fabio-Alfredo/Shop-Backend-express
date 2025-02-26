const userService = require("../services/user.service");
const responseHandle = require("../handlers/response.handler");
const userCodes = require("../utils/errors/errorsCodes/user.codes");
const userDTO = require("../domain/dtos/user.dto");
const createHttpError = require("http-errors");

//CONTROLADOR PARA ASIGNAR UN ROL A UN
const assignRole = async (req, res, next) => {
  try {
    //se obtiene el id del usuario, los roles a asignar y la accion a realizar
    const { userId, roleIds, action } = req.body;
    //se obtiene el usuario que esta asignando el rol
    const user = req.user;

    //se asigna el rol al usuario
    await userService.assignRole(action, roleIds, userId, user.id);
    //se retorna un mensaje de exito
    return responseHandle(res, 201, "success", "role editado con exito");
  } catch (e) {
    //en caso de error se lanza una excepcion adecuada al error
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

//CONTROLADOR PARA BUSCAR UN USUARIO POR ID
const findUserById = async (req, res, next) => {
  try {
    //se obtiene el id del usuario a buscar
    const { id } = req.params;
    //se busca el usuario
    const user = await userService.findById(id);
    //se retorna el usuario encontrado
    return responseHandle(res, 200, "success", userDTO(user));
  } catch (e) {
    //en caso de error se lanza una excepcion adecuada al error
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

//CONTROLADOR PARA OBTENER TODOS LOS USUARIOS
const findAll = async (req, res, next) => {
  try {
    //se obtiene el id del rol por el cual se van a buscar los usuarios
    const { roleId } = req.query || null;
    //se buscan los usuarios
    const users = await userService.findAllByRole(roleId);
    //se retornan los usuarios
    return responseHandle(
      res,
      200,
      "success",
      users.map((user) => userDTO(user))
    );
  } catch (e) {
    //en caso de error se lanza una excepcion adecuada al error
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
