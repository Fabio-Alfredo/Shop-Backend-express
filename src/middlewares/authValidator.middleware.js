const createHttpError = require('http-errors')
const jwt = require('../utils/security/jwt.utl');


const authValidator = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization)
      throw createHttpError(401, 'authorization header is required');

    const token = authorization.split(" ")[1];

    if (!token)
      throw createHttpError(400, 'invalid token');

    const payload = jwt.verifyToken(token);

    if (!payload.valid)
      throw createHttpError(401, 'invalid credentials');

    req.user = payload.data;
    req.token = token;
    next();

  } catch (e) {
    next(e)
  }
}

const roleValidator = (roles) => {
  return (req, res, next) => {
    try {
      const {user}=req

      if (!roles.some(role=> user.roles.includes(role)))
        throw createHttpError(403, 'You are not allowed to access this resource');

      next();
    } catch (e) {
      next(e);
    }
  }
}


module.exports = {
  authValidator,
  roleValidator
}
