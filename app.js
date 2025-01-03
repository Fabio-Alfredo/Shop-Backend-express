const express = require("express");
const dbConnection = require("./src/configs/dbConnection.config");
const config = require("./src/configs/config").production;
const Routes = require("./src/routes/index.route");
const errorHandler = require('./src/errors/error.handdler');

const app = express();

dbConnection();

app.use(express.json());
app.use(Routes);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
