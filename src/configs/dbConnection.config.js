const db = require("../domain/models/index");

const dbConnection = async () => {
  try {
    await db.sequelize.authenticate(); // Verifica la conexión sin modificar la DB
    console.log("Conexión a la base de datos establecida");

    if (process.env.NODE_ENV === "development") {
      await db.sequelize.sync({ force: false }); // Solo sincroniza en desarrollo
      console.log("Base de datos sincronizada");
    }
  } catch (error) {
    console.error("Error al conectar la base de datos:", error);
  }
};

module.exports = dbConnection;
