const { sign, verify } = require("jsonwebtoken");
const config = require("../../configs/config");


/**
 * Función para generar un token
 * @param {Object} payload - Información que se desea guardar en el token
 * @returns {Object} - Token generado
 */
const generateToken = (payload) => {
  const token = sign(payload, config.jsw, { expiresIn: "2h" });
  return { token };
};

/**
 * Función para verificar un token
 * @param {String} token - Token a verificar
 * @returns {Object} - Informacion del token verificado
 * @throws {TokenExpiredError} - Error si el token ha expirado
 */
const verifyToken = (token) => {
  try {
    const data = verify(token, config.jsw);
    return { valid: true, data };
  } catch (e) {
    if (e instanceof TokenExpiredError) {
      return { valid: false, message: "Token expired" };
    }
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
