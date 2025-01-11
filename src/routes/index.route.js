const Router = require("express").Router;
const authRoute = require("./auth.route");
const productRoute = require("./product.route");
const categoryRoute = require("./category.route");
const orderRouter = require("../routes/order.route");
const paymentRoute = require("./payment.route");

const indexRouter = Router();

indexRouter.use("/auth", authRoute);
indexRouter.use("/product", productRoute);
indexRouter.use("/category", categoryRoute);
indexRouter.use("/order", orderRouter);
indexRouter.use("/payment", paymentRoute);

module.exports = indexRouter;
