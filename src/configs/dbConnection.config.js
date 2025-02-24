const db = require("../domain/models/index");

const dbConnection = () => {
  db.sequelize
    .sync({ force: false})
    .then(() => {
      console.log("db sincronizada");
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = dbConnection;
