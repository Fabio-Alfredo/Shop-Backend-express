const Route = require("express").Router;
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/authValidator.middleware");
const runValidator = require("../middlewares/validator.middleware");
const userValidator = require("../validators/user.validator");

const userRoute = Route();

userRoute.post(
  "/assingRole",
  authMiddleware.authValidator,
  authMiddleware.roleValidator(['ADMIN']),
  userValidator.assingRoleValidator,
  runValidator,
  userController.assignRole
);

module.exports = userRoute;
