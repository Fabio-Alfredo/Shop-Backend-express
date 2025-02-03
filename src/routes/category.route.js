const Router = require("express").Router;
const categoryController = require("../controllers/category.controller");
const categoryValidator = require("../validators/category.validator");
const runValidator = require("../middlewares/validator.middleware");
const authMiddleware = require("../middlewares/authValidator.middleware");

const categoryRouter = Router();

categoryRouter.post(
  "/create",
  authMiddleware.authValidator,
  authMiddleware.roleValidator(['ADMIN']),
  categoryValidator.createValidator,
  runValidator,
  categoryController.createCategory
);

module.exports = categoryRouter;
