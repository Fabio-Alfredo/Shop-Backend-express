const { Model } = require("sequelize");
const { User } = require("../domain/models");
const { Role } = require("../domain/models");

//inicializa las transacciones
const startTransaction = async () => {
  const t = await User.sequelize.transaction();
  return t;
};

//crea un usuario
const create = async (user, t) => {
  const newUser = await User.create(user, { transaction: t });
  return newUser;
};

//verifica si existe un usuario con ese email
//incluye el rol del usuario
const existUser = async (email) => {
  const user = await User.findOne({ where: { email }, include: Role });
  return user;
};

//busca un usuario por id
//incluye el rol del usuario
const findById = async (id, t) => {
  const user = await User.findByPk(id, {
    transaction: t,
    include: { model: Role, through: { attributes: [] } },
  });
  return user;
};

//busca todos los usuarios
//incluye el rol del usuario
const findAll = async () => {
  const users = await User.findAll({
    include: { model: Role, through: { attributes: [] } },
  });
  return users;
};

//busca todos los usuarios por rol
//incluye el rol del usuario
const findAllByRol = async (id) => {
  const users = await User.findAll({
    include: {
      model: Role,
      where: { id },
      through: { attributes: [] },
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
