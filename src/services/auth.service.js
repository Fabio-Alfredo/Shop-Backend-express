const userRepository = require("../repositories/user.repository");
const ServiceError = require("../errors/service.error");
const UserCodes = require("../utils/errorsCodes/user.codes");
const {generateToken} = require("../utils/security/jwt.utl");

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

const authUser = async (email, password) => {
  try {
    const user = await userRepository.existUser(email);
    if (!user || !( await user.validatePassword(password)))
      throw new ServiceError(
        "Invalid credentials ",
        UserCodes.INVALID_CREDENTIALS
      );
    const token = generateToken({ id: user.id, email: user.email });
    return token;
  } catch (e) {
    throw new ServiceError(
      e.message || "Internal server error while register user",
      e.code || UserCodes.NOT_FOUND
    );
  }
};

module.exports = {
  createUser,
  authUser,
};
