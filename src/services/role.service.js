const roleRepository = require("../repositories/role.repository");
const serviceError = require("../utils/errors/service.error");
const roleCodes = require("../utils/errors/errorsCodes/role.code");

//FUNCION PARA BUSCAR UN ROL POR ID
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

//FUNCION PARA BUSCAR VARIOS ROLES POR ID
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

//FUNCION PARA BUSCAR TODOS LOS ROLES
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

//FUNCION PARA CREAR UN NUEVO ROL
const create = async (id, role) => {
  try {
    //se verifica si ya existe un rol con ese id y nombre
    //si ya existe se lanza una excepcion
    const exists = await roleRepository.existsRole(id, role);
    if (exists)
      throw new serviceError(
        "Role already exists",
        roleCodes.ROLE_ALREADY_EXISTS
      );

    //se crea el nuevo rol
    const newRole = await roleRepository.create(id, role);
    //se retorna el rol si todo fue exitoso
    return newRole;
  } catch (e) {
    //si ocurre un error se lanza una excepcion
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
