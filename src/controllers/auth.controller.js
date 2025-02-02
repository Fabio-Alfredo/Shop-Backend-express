const authService = require("../services/auth.service");
const UserCodes = require("../utils/errors/errorsCodes/user.codes");
const createHttpError = require("http-errors");
const responseHandler = require("../handlers/response.handler");

const registerUser = async (req, res, next) => {
  try {
    const user = req.body;
    const newUser = await authService.createUser(user);
    responseHandler(res,201, "success", newUser);
  } catch (e) {
    switch (e.code) {
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
    responseHandler(res,200, "success login", token);
  } catch (e) {
    switch (e) {
      default:
        next(e);
    }
  }
};

module.exports = {
  registerUser,
  loginUser
};
