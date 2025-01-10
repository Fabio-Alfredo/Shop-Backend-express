const Router = require("express").Router;
const categoryController = require("../controllers/category.controller");
const categoryValidator = require("../validators/category.validator");
const runValidator = require("../middlewares/validator.middleware");

const categoryRouter = Router();

categoryRouter.post(
  "/create",
  categoryValidator.createValidator,
  runValidator,
  categoryController.createCategory
);

module.exports = categoryRouter;
