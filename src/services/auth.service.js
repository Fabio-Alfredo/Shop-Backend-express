const userRepository = require("../repositories/user.repository");
const ServiceError = require("../utils/errors/service.error");
const UserCodes = require("../utils/errors/errorsCodes/user.codes");
const { generateToken } = require("../utils/security/jwt.utl");

const createUser = async (user) => {
  const t = await userRepository.startTransaction();
  try {
    const existUser = await userRepository.existUser(user.email);
    if (existUser)
      throw new ServiceError("Email already in use", UserCodes.ALREADY_EXISTS);
    const newUser = await userRepository.create(user, t);

    await t.commit();
    return newUser;
  } catch (e) {
    await t.rollback();
    throw new ServiceError(
      e.message || "Internal server error while register user",
      e.code || UserCodes.NOT_FOUND
    );
  }
};

const authUser = async (email, password) => {
  try {
    const user = await userRepository.existUser(email);
    if (!user || !(await user.validatePassword(password)))
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
