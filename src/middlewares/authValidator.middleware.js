const createHttpError = require('http-errors')
const jwt = require('../utils/security/jwt.utl');


const authValidator = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization.split(' ')[0];

    if (!token)
      throw createHttpError(400, 'invalid token');

    const payload = jwt.verifyToken(token);

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
