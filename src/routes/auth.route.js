const Router = require("express").Router;
const authController = require("../controllers/auth.controller");
const authValidator = require("../validators/auth.validator");
const runValidator = require("../middlewares/validator.middleware");

//crea una instancia de Router
const authRoute = Router();

/**
 * @route POST /auth/register
 * @desc Registra un nuevo usuario en la base de datos
 * @access Public
 * @middleware
 * -authValidator.RegisterValidator: valida los campos de entrada del usuario
 * -runValidator: Ejecuta la validación y maneja errores en caso de datos inválidos.
 * @controller
 * -authController.registerUser: Registra un nuevo usuario en la base de datos
 */
authRoute.post(
  "/register",
  authValidator.registerValidator,
  runValidator,
  authController.registerUser
);

/**
 * @route POST /auth/login
 * @desc Inicia sesión en la aplicación
 * @access Public
 * @middleware
 * -authValidator.loginValidator: valida los campos de entrada del usuario
 * -runValidator: Ejecuta la validación y maneja errores en caso de datos inválidos.
 * @controller
 * -authController.loginUser: Inicia sesión en la aplicación y devuelve un token de acceso
 */

authRoute.post(
  "/login",
  authValidator.loginValidator,
  runValidator,
  authController.loginUser
);

module.exports = authRoute;
