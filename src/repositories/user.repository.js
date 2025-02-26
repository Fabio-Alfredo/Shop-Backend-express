const { Model } = require("sequelize");
const { User } = require("../domain/models");
const { Role } = require("../domain/models");

/**
 * Inicializa una transaccion
 *
 * @returns {Promise<*>} transaccion
 */
const startTransaction = async () => {
  const t = await User.sequelize.transaction();
  return t;
};

/**
 * Crea un nuevo usuario
 *
 * @param {object} user - datos del usuario
 * @param t - transaccion
 * @returns {Promise<*>} usuario creado
 */
const create = async (user, t) => {
  const newUser = await User.create(user, { transaction: t });
  return newUser;
};

/**
 * Verifica si existe un usuario por email
 *
 * @param {string} email - email del usuario
 * @returns {Promise<*>} usuario encontrado
 */
const existUser = async (email) => {
  const user = await User.findOne({
    where: { email },
    include: Role, //incluye loes roles del usuario
  });
  return user;
};

/**
 * Busca un usuario por id
 *
 * @param {UUID} id - id del usuario
 * @param t - transaccion
 * @returns {Promise<*>} usuario encontrado
 */
const findById = async (id, t) => {
  const user = await User.findByPk(id, {
    transaction: t,
    include: {
      model: Role, //incluye el rol del usuario
      through: { attributes: [] }, //no se muestran los atributos de la relacion
    },
  });
  return user;
};

/**
 * Busca todos los usuarios
 *
 * @returns {Promise<*>} usuarios encontrados
 */
const findAll = async () => {
  const users = await User.findAll({
    include: {
      model: Role, //incluye el rol del usuario
      through: { attributes: [] }, //no se muestran los atributos de la relacion
    },
  });
  return users;
};

/**
 * Busca todos los usuarios por rol
 *
 * @param {string} id - id del rol
 * @returns {Promise<*>} usuarios encontrados
 */
const findAllByRol = async (id) => {
  const users = await User.findAll({
    include: {
      model: Role, //incluye los roles
      where: { id },
      through: { attributes: [] }, //no se muestran los atributos de la relacion 
    },
  });
  return users;
};

module.exports = {
  create,
  existUser,
  startTransaction,
  findById,
  findAllByRol,
  findAll,
};
