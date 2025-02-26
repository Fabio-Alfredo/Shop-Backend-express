const Router = require("express").Router;
const productController = require("../controllers/product.controller");
const productValidator = require("../validators/product.validator");
const runValidator = require("../middlewares/validator.middleware");
const autValidator = require("../middlewares/authValidator.middleware");

//crea una instancia de Router
const productRouter = Router();

/**
 * @route POST /product/register
 * @desc Registra un nuevo producto
 * @access Private (Admin)
 * @middleware
 * -authValidator.authValidator: Valida el token de acceso del usuario
 * -authValidator.roleValidator: Valida si el usuario tiene el rol de ADMIN
 * -productValidator.createValidator: Valida los campos de entrada del producto
 * -runValidator: Ejecuta la validación y maneja errores en caso de datos inválidos.
 * @controller
 * -productController.registerProduct: Registra un nuevo producto
 */
productRouter.post(
  "/register",
  autValidator.authValidator,
  autValidator.roleValidator(["ADMIN"]),
  productValidator.createValidator,
  runValidator,
  productController.registerProduct
);

/**
 * @route PUT /product/addStock
 * @desc Agrega stock a un producto
 * @access Private (Admin)
 * @middleware
 * -authValidator.authValidator: Valida el token de acceso del usuario
 * -authValidator.roleValidator: Valida si el usuario tiene el rol de ADMIN
 * -productValidator.addStockValidator: Valida los campos de entrada del producto
 * -runValidator: Ejecuta la validación y maneja errores en caso de datos inválidos.
 * @controller
 * -productController.addProducts: Agrega stock a un producto
 */
productRouter.put(
  "/addStock",
  autValidator.authValidator,
  autValidator.roleValidator(["ADMIN"]),
  productValidator.addStockValidator,
  runValidator,
  productController.addProducts
);

/**
 * @route PUT /product/update/:id
 * @desc Actualiza los datos de un producto
 * @access Private (Admin)
 * @middleware
 * -authValidator.authValidator: Valida el token de acceso del usuario
 * -authValidator.roleValidator: Valida si el usuario tiene el rol de ADMIN
 * -productValidator.updateValidator: Valida los campos de entrada del producto
 * -runValidator: Ejecuta la validación y maneja errores en caso de datos inválidos.
 * @controller
 * -productController.updateDataProduct: Actualiza los datos de un producto
 */
productRouter.put(
  "/update/:id",
  autValidator.authValidator,
  autValidator.roleValidator(["ADMIN"]),
  productValidator.updateValidator,
  runValidator,
  productController.updateDataProduct
);

/**
 * @route DELETE /product/delete/:id
 * @desc Elimina un producto
 * @access Private (Admin)
 * @middleware
 * -authValidator.authValidator: Valida el token de acceso del usuario
 * -authValidator.roleValidator: Valida si el usuario tiene el rol de ADMIN
 * -productValidator.idValidator: Valida los campos de entrada del producto
 * -runValidator: Ejecuta la validación y maneja errores en caso de datos inválidos.
 * @controller
 * -productController.deleteProduct: Elimina un producto
 */
productRouter.delete(
  "/delete/:id",
  autValidator.authValidator,
  autValidator.roleValidator(["ADMIN"]),
  productValidator.idValidator,
  runValidator,
  productController.deleteProduct
);

/**
 * @route GET /product/findAll
 * @desc Obtiene todos los productos, opcionalmente se puede filtrar por categoría
 * @query {String} [category] - nombre de la categoria para filtrar los productos (opcional)
 * @access Public
 * @controller
 * -productController.findAllProducts: Obtiene todos los productos
 */
productRouter.get("/findAll", productController.findAllProducts);

/**
 * @route GET /product/findId/:id
 * @desc Obtiene un producto por id
 * @access Public
 * @middleware
 * -productValidator.idValidator: Valida los campos de entrada del producto
 * -runValidator: Ejecuta la validación y maneja errores en caso de datos inválidos.
 * @controller
 * -productController.findProductById: Obtiene un producto por id
 */
productRouter.get(
  "/findId/:id",
  productValidator.idValidator,
  runValidator,
  productController.findProductById
);

module.exports = productRouter;
