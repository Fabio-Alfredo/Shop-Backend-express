const { User } = require("../models");
const { User_role } = require("../models");

const startTransaction = async () => {
  const t = await User.sequelize.transaction();
  return t;
};

const create = async (user, t) => {
  await User.create(user, {transaction:t});
  return "User created";
};

const existUser = async (email) => {
  const user = await User.findOne({ where: { email }, include: User_role});
  return user;
};

module.exports = {
  create,
  existUser,
  startTransaction
};
