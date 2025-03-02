const Route = require("express").Router;
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/authValidator.middleware");
const runValidator = require("../middlewares/validator.middleware");
const userValidator = require("../validators/user.validator");

//crea una instancia de Router
const userRoute = Route();

/**
 * @route POST /user/assingRole
 * @desc Asignar un nuevo rol a un usuario
 * @access Private (Admin)
 * @middleware
 * -authMiddleware.authValidator: Valida el token de acceso del usuario
 * -authMiddleware.roleValidator: Valida si el usuario tiene el rol de ADMIN
 * -userValidator.assingRoleValidator: Valida los campos de entrada del rol
 * -runValidator: Ejecuta la validación y maneja errores en caso de datos inválidos.
 * @controller
 * -userController.assignRole: Asigna un nuevo rol a un usuario
 */
userRoute.put(
  "/assingRole",
  authMiddleware.authValidator,
  authMiddleware.roleValidator(["ADMIN"]),
  userValidator.assingRoleValidator,
  runValidator,
  userController.assignRole
);

/**
 * @route GET /user/all
 * @desc Obtiene todos los usuarios
 * @access Private (Admin)
 * @middleware
 * -authMiddleware.authValidator: Valida el token de acceso del usuario
 * -authMiddleware.roleValidator: Valida si el usuario tiene el rol de ADMIN
 * @controller
 * -userController.findAll: Obtiene todos los usuarios
 */
userRoute.get(
  "/all",
  authMiddleware.authValidator,
  authMiddleware.roleValidator(["ADMIN"]),
  userController.findAll
);

/**
 * @route GET /user/findId/:id
 * @desc Obtiene un usuario por su id
 * @access Private (Admin)
 * @middleware
 * -authMiddleware.authValidator: Valida el token de acceso del usuario
 * -authMiddleware.roleValidator: Valida si el usuario tiene el rol de ADMIN
 * -userValidator.idValidators: Valida los campos de entrada del usuario
 * -runValidator: Ejecuta la validación y maneja errores en caso de datos inválidos.
 * @controller
 * -userController.findUserById: Obtiene un usuario por su id
 */
userRoute.get(
  "/findId/:id",
  authMiddleware.authValidator,
  authMiddleware.roleValidator(["ADMIN"]),
  userValidator.idValidators,
  runValidator,
  userController.findUserById
);

module.exports = userRoute;
