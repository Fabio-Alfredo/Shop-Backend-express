const user_roleRepository = require("../repositories/user_role.repository");
const serviceError = require("../utils/errors/service.error");

//FUNCION PARA CREAR UNA RELACION ENTRE USUARIO Y ROLES
const createRelation = async (userId, roleIds, editedBy, t) => {
  try {
    //se crea un arreglo con las relaciones a insertar
    const relation = roleIds.map((roleId) => {
      return {
        roleId,
        userId,
        editedBy,
      };
    });

    //se crean las relaciones
    // se retorna true si todo fue exitoso
    await user_roleRepository.create(relation, t);
    return true;
  } catch (e) {
    //si ocurre un error se lanza una excepcion
    throw new serviceError(e.message || "Internal server error", e.code || 500);
  }
};

//FUNCION PARA ELIMINAR UNA RELACION ENTRE USUARIO Y ROLES
const deleteRelation = async (userId, roleIds, editedBy, t) => {
  try {
    //se eliminan las relaciones
    await user_roleRepository.deleteByUserIdAndRoleId(userId, roleIds, t);

    //se retorna true si todo fue exitoso
    return true;
  } catch (e) {
    //si ocurre un error se lanza una excepcion
    throw new serviceError(e.message || "Internal server error", e.code || 500);
  }
};

module.exports = {
  createRelation,
  deleteRelation,
};
