const { User } = require("../models");

const startTransaction = async () => {
  const t = await User.sequelize.transaction();
  return t;
};

const create = async (user, t) => {
  await User.create(user, {transaction:t});
  return "User created";
};

const existUser = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};

module.exports = {
  create,
  existUser,
  startTransaction
};
