const Route = require("express").Router;
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/authValidator.middleware");
const runValidator = require("../middlewares/validator.middleware");

const userRoute = Route();

userRoute.post(
  "/assingRole",
  authMiddleware.authValidator,
  userController.assignRole
);

module.exports = userRoute;
