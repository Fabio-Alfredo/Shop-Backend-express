const Router = require("express").Router;
const roleController = require("../controllers/roles.controller");
const authMiddleware = require("../middlewares/authValidator.middleware");
const roleValidator = require("../validators/role.validator");
const runValidator = require("../middlewares/validator.middleware");

//crea una instancia de Router
const roleRoute = Router();

/**
 * @route GET /role/all
 * @desc Obtiene todos los roles
 * @access Private (Admin)
 * @middleware
 * -authMiddleware.authValidator: Valida el token de acceso del usuario
 * -authMiddleware.roleValidator: Valida si el usuario tiene el rol de ADMIN
 * @controller
 * -roleController.findAllRoles: Obtiene todos los roles
 */
roleRoute.get(
  "/all",
  authMiddleware.authValidator,
  authMiddleware.roleValidator(["ADMIN"]),
  roleController.findAllRoles
);

/**
 * @route POST /role/create
 * @desc Crea un nuevo rol
 * @access Private (Admin)
 * @middleware
 * -authMiddleware.authValidator: Valida el token de acceso del usuario
 * -authMiddleware.roleValidator: Valida si el usuario tiene el rol de ADMIN
 * -roleValidator.createRoleValidator: Valida los campos de entrada del rol
 * -runValidator: Ejecuta la validación y maneja errores en caso de datos inválidos.
 * @controller
 * -roleController.createRole: Crea un nuevo rol
 */
roleRoute.post(
  "/create",
  authMiddleware.authValidator,
  authMiddleware.roleValidator(["ADMIN"]),
  roleValidator.createRoleValidator,
  runValidator,
  roleController.createRole
);

module.exports = roleRoute;
