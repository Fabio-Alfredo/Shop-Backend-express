const { validationResult } = require("express-validator");

const runValidator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array())
    const errorMessages = errors.array().map((err) => err.msg);
    return res.status(400).json({ errors: errorMessages });
  }
  next();
};

module.exports = runValidator;
