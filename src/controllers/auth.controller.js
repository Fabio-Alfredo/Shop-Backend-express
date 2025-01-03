const authService = require("../services/auth.service");
const UserCodes = require("../utils/errorsCodes/user.codes");
const createHttpError = require("http-errors");

const registerUser = async (req, res, next) => {
  try {
    const user = req.body;
    const newUser = await authService.createUser(user);
    res.status(201).json(newUser);
  } catch (e) {
    switch (e) {
      case UserCodes.NOT_FOUND:
        next(createHttpError(500, e.message));
        break;
      default:
        next(e);
    }
  }
};

module.exports = {
  registerUser,
};
