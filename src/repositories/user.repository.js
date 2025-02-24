const { Model } = require("sequelize");
const { User } = require("../domain/models");
const { Role } = require("../domain/models");

const startTransaction = async () => {
  const t = await User.sequelize.transaction();
  return t;
};

const create = async (user, t) => {
  const newUser = await User.create(user, { transaction: t });
  return newUser;
};

const existUser = async (email) => {
  const user = await User.findOne({ where: { email }, include: Role });
  return user;
};

const findById = async (id, t) => {
  const user = await User.findByPk(id, {
    transaction: t,
    include: { model: Role, through: { attributes: [] } },
  });
  return user;
};

const findAll = async () => {
  const users = await User.findAll({
    include: { model: Role, through: { attributes: [] } },
  });
  return users;
};

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
