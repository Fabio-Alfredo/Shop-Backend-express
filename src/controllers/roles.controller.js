const createHttpError = require("http-errors");
const ServiceError = require("../utils/errors/service.error");
const roleService = require("../services/role.service");
const responseHandler = require("../handlers/response.handler");

/**
 * Controlador para buscar todos los roles
 * 
 * @param {object} req - datos de la peticion
 * @param {object} res - respuesta con los roles encontrados
 * @param {object} next - middleware para manejar errores
 * @returns {object} respuesta con los roles encontrados
 */
const findAllRoles = async (req, res, next) => {
  try {
    //se obtienen todos los roles
    const roles = await roleService.findAll();
    //se retornan los roles
    responseHandler(res, 200, "success", roles);
  } catch (e) {
    //en caso de error se lanza una excepcion adecuada al error
    switch (e.code) {
      case ServiceError.NOT_FOUND:
        next(createHttpError(404, e.message));
        break;
      default:
        next(e);
    }
  }
};

/**
 * Controlador para crear un rol
 * 
 * @param {object} req - datos del rol a crear
 * @param {object} res - respuesta con el rol creado
 * @param {object} next - middleware para manejar errores
 * @returns {object} respuesta con el rol creado
 */
const createRole = async (req, res, next) => {
  try {
    //se obtiene el id y nombre del rol
    const { id, name } = req.body;
    //se crea el rol
    const newRole = await roleService.create(id, name);
    //se retorna el rol creado
    responseHandler(res, 201, "success", newRole);
  } catch (e) {
    //en caso de error se lanza una excepcion adecuada al error
    switch (e.code) {
      case ServiceError.ALREADY_EXISTS:
        next(createHttpError(409, e.message));
        break;
      default:
        next(e);
    }
  }
};

module.exports = {
  findAllRoles,
  createRole,
};
