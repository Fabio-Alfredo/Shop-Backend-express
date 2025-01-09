const Router = require("express").Router;
const authRoute = require('./auth.route');
const productRoute = require('./product.route')
const categoryRoute = require('./category.route');

const indexRouter = Router();

indexRouter.use('/auth', authRoute);
indexRouter.use('/product', productRoute);
indexRouter.use('/category', categoryRoute);

module.exports = indexRouter;
