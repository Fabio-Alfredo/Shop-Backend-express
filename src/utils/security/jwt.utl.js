const { hash, verify } = require("jsonwebtoken");
const config = require("../../configs/config");

const generateToken = (payload) => {
  const token = hash(payload, config.production.jsw, { expiresIn: "1d" });
  return token;
};

const verifyToken = (token) => {
  try {
    const data = verify(token, config.production.jsw);
    return data;
  } catch (e) {
    return null;
  }
};

module.exports = {
  generateToken,
  verifyToken
};
