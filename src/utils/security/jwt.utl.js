const { sign, verify } = require("jsonwebtoken");
const config = require("../../configs/config");

const generateToken = (payload) => {
  const token = sign(payload, config.production.jsw, { expiresIn: "2h" });
  return { token };
};

const verifyToken = (token) => {
  try {
    const data = verify(token, config.production.jsw);
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
