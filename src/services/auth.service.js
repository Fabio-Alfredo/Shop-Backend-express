const userRepository = require("../repositories/user.repository");
const ServiceError = require("../errors/service.error");
const UserCodes = require("../utils/errorsCodes/user.codes");

const createUser = async (user) => {
  try {
    const existUser = userRepository.existUser(user.email);
    if (existUser)
      throw new ServiceError("Email already in use", UserCodes.ALREADY_EXISTS);
    const newUser = await userRepository.create(user);
    return newUser;
  } catch (e) {
    throw new ServiceError(
      e.message || "Internal server error while register user",
      e.code || UserCodes.NOT_FOUND
    );
  }
};

module.exports = {
  createUser,
};
