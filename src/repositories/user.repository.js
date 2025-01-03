const { where } = require("sequelize");
const { User } = require("../models");

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
};
