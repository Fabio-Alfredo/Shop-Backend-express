const Router = require('express').Router;
const categoryController = require('../controllers/category.controller');

const categoryRouter = Router();

categoryRouter.post('/create', categoryController.createCategory);

module.exports=categoryRouter;