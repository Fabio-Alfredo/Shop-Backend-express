const { User } = require("../models");
const { Role } = require("../models");

const startTransaction = async () => {
  const t = await User.sequelize.transaction();
  return t;
};

const create = async (user, t) => {
  const newUser =await User.create(user, {transaction:t});
  return newUser;
};

const existUser = async (email) => {
  const user = await User.findOne({ where: { email }, include:Role});
  return user;
};

const findById = async  (id, t)=>{
  const user = await  User.findByPk(id, {transaction:t, include: Role});
  return user;
}

module.exports = {
  create,
  existUser,
  startTransaction,
  findById
};
