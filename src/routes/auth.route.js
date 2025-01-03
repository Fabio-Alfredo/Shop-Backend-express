const Router = require("express").Router;
const authController = require("../controllers/auth.controller");

const authRoute = Router();

authRoute.post("/register", authController.registerUser);

module.exports = authRoute;
