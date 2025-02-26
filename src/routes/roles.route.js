const Router = require("express").Router;
const roleController = require("../controllers/roles.controller");
const authMiddleware = require("../middlewares/authValidator.middleware");
const roleValidator = require("../validators/role.validator");
const runValidator = require("../middlewares/validator.middleware");

const roleRoute = Router();

roleRoute.get(
  "/all",
  authMiddleware.authValidator,
  authMiddleware.roleValidator(["ADMIN"]),
  roleController.findAllRoles
);

roleRoute.post(
  "/create",
  authMiddleware.authValidator,
  authMiddleware.roleValidator(["ADMIN"]),
  roleValidator.createRoleValidator,
  runValidator,
  roleController.createRole
);

module.exports = roleRoute;
