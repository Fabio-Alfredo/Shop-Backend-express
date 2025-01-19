const { User } = require("../models");

const startTransaction = async () => {
  const t = await User.sequelize.transaction();
  return t;
};

const create = async (user) => {
  const newUser = await User.create(user);
  return newUser;
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
