const db = require("../domain/models/index");

//sincroniza la base de datos
//force: false no elimina los datos de la base de datos
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
