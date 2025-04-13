const express = require("express");
const cors = require("cors");
const Routes = require("./src/routes/index.route");
const errorHandler = require("./src/handlers/error.handler");
const fileUpload = require("express-fileupload");

// Crear la aplicación de Express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(Routes);
app.use(errorHandler);

module.exports = app;
