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
      case UserCodes.ALREADY_EXISTS:
        next(createHttpError(409, e.message));
        break;
      default:
        next(e);
    }
  }
};

const loginUser = async (req, res, next) => {
  try {
    const {email, password}= req.body;
    const token = await authService.authUser(email, password);
    res.status(200).json(token)
  } catch (e) {
    switch (e) {
      default:
        next(e);
    }
  }
};

module.exports = {
  registerUser,
};
