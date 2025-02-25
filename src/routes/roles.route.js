const Router = require("express").Router;
const roleController = require("../controllers/roles.controller");
const authMiddleware = require("../middlewares/authValidator.middleware");
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
  roleController.createRole
);

module.exports = roleRoute;
