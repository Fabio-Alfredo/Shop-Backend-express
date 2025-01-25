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

    if (!payload)
      throw createHttpError(401, 'invalid credentials');

    req.user = payload;
    req.token = token;
    next();

  } catch (e) {
    next(e)
  }
}


module.exports = {
  authValidator,
}
