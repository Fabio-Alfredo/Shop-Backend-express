const express = require("express");
const cors = require("cors");
const Routes = require("./src/routes/index.route");
const errorHandler = require("./src/handlers/error.handler");

// Crear la aplicación de Express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(Routes);
app.use(errorHandler);

module.exports = app;
