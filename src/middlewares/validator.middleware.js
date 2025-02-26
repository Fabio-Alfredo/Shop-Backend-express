const { validationResult } = require("express-validator");

// Middleware para correr la validación de los campos en los controladores
// Si hay errores, se envía una respuesta con status 400
// y se envía un arreglo con los mensajes de error
const runValidator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((err) => err.msg);
    return res.status(400).json({ errors: errorMessages });
  }
  next();
};

module.exports = runValidator;
