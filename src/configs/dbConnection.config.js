const db = require("../models/index");

const dbConnection = () => {
  db.sequelize
    .sync({ force: true })
    .then(() => {
      console.log("db sincronizada");
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = dbConnection;
