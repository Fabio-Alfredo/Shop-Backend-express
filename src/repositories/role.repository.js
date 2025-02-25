const { where } = require("sequelize");
const { Role } = require("../domain/models");

const create = async (id, rol) => {
  const newRole = await Role.create({ id, rol });
  return newRole;
};

const findById = async (id) => {
  const role = await Role.findByPk(id);
  return role;
};

const existsRole = async (id, rol) => {
  const role = await Role.findOne({ where: { id, rol } });
  return role ? true : false;
};

const findAll = async () => {
  const roles = await Role.findAll();
  return roles;
};

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
