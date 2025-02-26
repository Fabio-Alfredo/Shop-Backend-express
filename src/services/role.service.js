const roleRepository = require("../repositories/role.repository");
const serviceError = require("../utils/errors/service.error");
const roleCodes = require("../utils/errors/errorsCodes/role.code");

/**
 * Servicio para buscar un rol por id
 * 
 * @param {String} id - id del rol
 * @returns {Promise<Object>} rol encontrado
 * @throws {ServiceError} error con detalles del problema
 */
const findById = async (id) => {
  try {
    //se busca el rol por id
    //si no existe se lanza una excepcion
    const role = await roleRepository.findById(id);
    if (!role)
      throw new serviceError(
        "Invalid role, not exists",
        roleCodes.ROLE_NOT_EXISTS
      );

    //se retorna el rol si todo fue exitoso
    return role;
  } catch (e) {
    //si ocurre un error se lanza una excepcion
    throw new serviceError(
      e.message || "Internal Service error",
      e.code || roleCodes.NOT_FOUND
    );
  }
};

/**
 * Servicio para buscar varios roles por id
 * 
 * @param {Array<String>} ids - ids de los roles
 * @returns {Promise<Array<Object>>} roles encontrados
 * @throws {ServiceError} error con detalles del problema
 */
const findAllByIds = async (ids) => {
  try {
    //se buscan los roles por id
    //si no existe alguno se lanza una excepcion
    const roles = (await roleRepository.findAllByIds(ids)) || [];
    if (roles && roles.length !== ids.length) {
      throw new serviceError("Invalid roles", roleCodes.ROLE_NOT_EXISTS);
    }

    //se retorna los roles si todo fue exitoso
    return roles;
  } catch (e) {
    //si ocurre un error se lanza una excepcion
    throw new serviceError(
      e.message || "Internal Service error",
      e.code || roleCodes.NOT_FOUND
    );
  }
};

/**
 * Servicio para buscar todos los roles
 * 
 * @returns {Promise<Array<Object>>} roles encontrados
 * @throws {ServiceError} error con detalles del problema
 */
const findAll = async () => {
  try {
    //se buscan todos los roles
    const roles = (await roleRepository.findAll()) || [];

    //se retorna los roles si todo fue exitoso
    return roles;
  } catch (e) {
    //si ocurre un error se lanza una excepcion
    throw new serviceError(
      e.message || "Internal Service error",
      e.code || roleCodes.NOT_FOUND
    );
  }
};

/**
 * Servicio para crear un nuevo rol
 * 
 * @param {String} id - id del rol
 * @param {String} role - nombre del rol
 * @returns {Promise<Object>} rol creado
 * @throws {ServiceError} error con detalles del problema
 */
const create = async (id, role) => {
  const t = await roleRepository.getTransaction();
  try {
    //se verifica si ya existe un rol con ese id y nombre
    //si ya existe se lanza una excepcion
    const exists = await roleRepository.existsRole(id, role, t);
    if (exists)
      throw new serviceError(
        "Role already exists",
        roleCodes.ROLE_ALREADY_EXISTS
      );

    //se crea el nuevo rol
    const newRole = await roleRepository.create(id, role);
    //se confirma la transaccion
    //se retorna el rol creado si todo fue exitoso
    await t.commit();
    return newRole;
  } catch (e) {
    //en caso de error se hace rollback de la transaccion
    //se lanza una excepcion
    await t.rollback();
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
  create,
};
