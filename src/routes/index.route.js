const Router = require("express").Router;
const authRoute = require('./auth.route');
const productRoute = require('./product.route')

const indexRouter = Router();

indexRouter.use('/auth', authRoute);
indexRouter.use('/product', productRoute);

module.exports = indexRouter;
