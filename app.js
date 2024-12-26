const express = require("express");
const config = require("./src/config/config").production;
const db = require("./src/models");

const app = express();

db.sequelize
  .sync()
  .then(() => {
    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
