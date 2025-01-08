const Router = require("express").Router;
const authController = require("../controllers/auth.controller");
const authValidator = require("../validators/auth.validator");
const runValidator = require("../middlewares/validator.middleware");

const authRoute = Router();

authRoute.post(
  "/register",
  authValidator.registerValidator,
  runValidator,
  authController.registerUser
);

module.exports = authRoute;
