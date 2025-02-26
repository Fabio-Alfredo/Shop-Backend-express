const { Role } = require("../domain/models");

/**
 * Crea un nuevo rol
 * 
 * @param {string} id - id del rol
 * @param {string} rol - nombre del rol
 * @returns {Promise<*>} rol creado
 */
const create = async (id, rol) => {
  const newRole = await Role.create({ id, rol });
  return newRole;
};

/**
 * Busca un rol por id
 * 
 * @param {number} id - id del rol
 * @returns {Promise<*>} rol encontrado
 */
const findById = async (id) => {
  const role = await Role.findByPk(id);
  return role;
};

/**
 * Verifica si existe un rol por id y nombre
 * 
 * @param {string} id - id del rol
 * @param {string} rol - nombre del rol
 * @returns {Promise<boolean>} true si existe, false si no
 */
const existsRole = async (id, rol) => {
  const role = await Role.findOne({ where: { id, rol } });
  return role ? true : false;
};

/**
 * Busca todos los roles
 *
 * @returns {Promise<*>} roles encontrados
 */
const findAll = async () => {
  const roles = await Role.findAll();
  return roles;
};

/**
 * Busca todos los roles por id
 * 
 * @param {array[]} ids - ids de los roles
 * @returns {Promise<*>} roles encontrados
 */
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
