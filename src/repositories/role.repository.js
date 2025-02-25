const { Role } = require("../domain/models");

//crea un nuevo rol
const create = async (id, rol) => {
  const newRole = await Role.create({ id, rol });
  return newRole;
};

//busca un rol por id
const findById = async (id) => {
  const role = await Role.findByPk(id);
  return role;
};

//verifica si existe un rol con ese id y nombre
const existsRole = async (id, rol) => {
  const role = await Role.findOne({ where: { id, rol } });
  return role ? true : false;
};

//busca todos los roles
const findAll = async () => {
  const roles = await Role.findAll();
  return roles;
};

//busca todos los roles por id
const findAllByIds = async (ids) => {
  const roles = await Role.findAll({ where: { id: ids } });
  return roles;
};

module.exports = {
  create,
  findById,
  findAll,
  findAllByIds,
  existsRole,
};
