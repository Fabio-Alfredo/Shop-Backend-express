const Router = require("express").Router;
const authRoute = require("../routes/auth.route");

const indexRouter = Router();

indexRouter.use("/auth", authRoute);

module.exports = indexRouter;
