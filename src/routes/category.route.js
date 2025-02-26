const Router = require("express").Router;
const categoryController = require("../controllers/category.controller");
const categoryValidator = require("../validators/category.validator");
const runValidator = require("../middlewares/validator.middleware");
const authMiddleware = require("../middlewares/authValidator.middleware");

//crea una instancia de Router
const categoryRouter = Router();

/**
 * @route POST /category/create
 * @desc Crea una nueva categoría
 * @access Private (Admin)
 * @middleware
 * -authMiddleware.authValidator: Valida el token de acceso del usuario
 * -authMiddleware.roleValidator: Valida si el usuario tiene el rol de ADMIN
 * -categoryValidator.createValidator: Valida los campos de entrada de la categoría
 * -runValidator: Ejecuta la validación y maneja errores en caso de datos inválidos.
 * @controller
 * -categoryController.createCategory: Crea una nueva categoría
 */
categoryRouter.post(
  "/create",
  authMiddleware.authValidator,
  authMiddleware.roleValidator(["ADMIN"]),
  categoryValidator.createValidator,
  runValidator,
  categoryController.createCategory
);

/**
 * @route GET /category/all
 * @desc Obtiene todas las categorías
 * @access Private (Admin)
 * @middleware
 * -authMiddleware.authValidator: Valida el token de acceso del usuario
 * -authMiddleware.roleValidator: Valida si el usuario tiene el rol de ADMIN
 * @controller
 * -categoryController.findAllCategories: Obtiene todas las categorías
 */
categoryRouter.get(
  "/all",
  authMiddleware.authValidator,
  authMiddleware.roleValidator(["ADMIN"]),
  categoryController.findAllCategories
);

module.exports = categoryRouter;
