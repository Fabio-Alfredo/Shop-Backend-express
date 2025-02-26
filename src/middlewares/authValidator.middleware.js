const createHttpError = require("http-errors");
const jwt = require("../utils/security/jwt.utl");

//Middleware para validar la autenticacion de un usuario
const authValidator = async (req, res, next) => {
  try {
    //se valida que exista el header de autorizacion
    //si no existe se lanza una excepcion
    const { authorization } = req.headers;
    if (!authorization)
      throw createHttpError(401, "authorization header is required");

    //se obtiene el token del header de autorizacion
    //si no existe se lanza una excepcion
    const token = authorization.split(" ")[1];
    if (!token) throw createHttpError(400, "invalid token");

    //se verifica el token
    //si no es valido se lanza una excepcion
    const payload = jwt.verifyToken(token);
    if (!payload.valid) throw createHttpError(401, "invalid credentials");

    //se asigna la data del usuario y el token al request
    //y se llama al siguiente middleware
    req.user = payload.data;
    req.token = token;
    next();
  } catch (e) {
    //en caso de error se lanza una excepcion con el error
    next(e);
  }
};

//Middleware para validar los roles de un usuario
const roleValidator = (roles) => {
  return (req, res, next) => {
    try {
      //se obtiene el usuario del request
      const { user } = req;

      //se valida que el usuario tenga alguno de los roles permitidos
      if (!roles.some((role) => user.roles.includes(role)))
        throw createHttpError(
          403,
          "You are not allowed to access this resource"
        );

      //si el usuario tiene alguno de los roles permitidos se llama al siguiente middleware
      next();
    } catch (e) {
      //en caso de error se lanza una excepcion con el error
      next(e);
    }
  };
};

module.exports = {
  authValidator,
  roleValidator,
};
