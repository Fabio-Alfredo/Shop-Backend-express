const userRepository = require("../repositories/user.repository");
const roleService = require("../services/role.service");
const user_roleService = require("../services/user_role.service");
const userCodes = require("../utils/errors/errorsCodes/user.codes");
const roleOperations = require("../utils/constants/operationRoles.util");
const ServiceError = require("../utils/errors/service.error");
const serviceError = require("../utils/errors/service.error");

/**
 * Servicio para asignar o quitar roles a un usuario
 *
 * @param {String} action - operacion a realizar
 * @param {Array<String>} roleIds - ids de los roles
 * @param {UUID} userId - id del usuario
 * @param {UUID} editedBy - id del usuario que realiza la operacion
 * @returns {Promise<Boolean>} true si todo fue exitoso
 * @throws {ServiceError} error con detalles del problema
 */
const assignRole = async (action, roleIds, userId, editedBy) => {
  const t = await userRepository.startTransaction();
  try {
    //se valida que el usuario y los roles exist
    const user = await findById(userId);
    await roleService.findAllByIds(roleIds);

    //se valida que el usuario no se este editando a si mismo
    if (user.id == editedBy)
      throw new ServiceError(
        "Invalid action update your roles",
        userCodes.INVALID_ACTION
      );

    //se verifica si se va a agregar o eliminar un rol
    //y que la operacion sea una valida
    if (action === roleOperations.ADD_ROLE) {
      await user_roleService.createRelation(user.id, roleIds, editedBy, t);
    } else if (action === roleOperations.REMOVE_ROLE) {
      await user_roleService.deleteRelation(user.id, roleIds, editedBy, t);
    } else {
      throw new ServiceError("Invalid action", userCodes.INVALID_ACTION);
    }

    //se confirma la transaccion
    // se retorna true si todo fue exitoso
    await t.commit();
    return true;
  } catch (e) {
    //si ocurre un error se hace rollback de la transaccion
    //se lanza una excepcion
    await t.rollback();
    throw new serviceError(
      e.message || "Internal server error",
      e.code || userCodes.NOT_FOUND
    );
  }
};

/**
 * Servicio para buscar un usuario por id
 * 
 * @param {UUID} id - id del usuario
 * @returns {Promise<Object>} usuario encontrado
 * @throws {ServiceError} error con detalles del problema
 */
const findById = async (id, t) => {
  try {
    //se busca el usuario por id
    const user = await userRepository.findById(id, t);

    //si no existe se lanza un error
    if (!user)
      throw new serviceError("Invalid data user", userCodes.USER_NOT_EXISTS);

    //se retorna el usuario
    return user;
  } catch (e) {
    //si ocurre un error se lanza una excepcion
    throw new serviceError(
      e.message || "Internal service error",
      e.code || userCodes.NOT_FOUND
    );
  }
};

/**
 * Servicio para buscar todos los usuarios por rol
 * 
 * @param {String} roleId - id del rol
 * @returns {Promise<Array<Object>>} usuarios encontrados
 * @throws {ServiceError} error con detalles del problema
 */
const findAllByRole = async (roleId) => {
  try {
    // genera un array vacio
    let users = [];
    // si no se envia un roleId se buscan todos los usuarios

    if (!roleId) users = await userRepository.findAll();
    else users = await userRepository.findAllByRol(roleId);

    //se retorna el array de usuarios
    return users;
  } catch (e) {
    //si ocurre un error se lanza una excepcion
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
