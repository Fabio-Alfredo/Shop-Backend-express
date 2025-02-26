const authService = require("../services/auth.service");
const UserCodes = require("../utils/errors/errorsCodes/user.codes");
const createHttpError = require("http-errors");
const responseHandler = require("../handlers/response.handler");

//CONTROLADOR PARA REGISTRAR UN NUEVO USUARIO
const registerUser = async (req, res, next) => {
  try {
    //se obtiene el usuario a registrar
    const user = req.body;
    //se crea el usuario
    const newUser = await authService.createUser(user);
    //se retorna el usuario creado
    return responseHandler(res, 201, "success", newUser);
  } catch (e) {
    //en caso de error se lanza una excepcion adecuada al error
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

//CONTROLADOR PARA INICIAR SESION
const loginUser = async (req, res, next) => {
  try {
    //se obtiene el email y password del usuario
    const { email, password } = req.body;
    //se autentica el usuario
    const token = await authService.authUser(email, password);
    //se retorna el token
    return responseHandler(res, 200, "success login", token);
  } catch (e) {
    //en caso de error se lanza una excepcion adecuada al error
    switch (e.code) {
      case UserCodes.INVALID_CREDENTIALS:
        next(createHttpError(401, e.message));
        break;
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
  loginUser,
};
