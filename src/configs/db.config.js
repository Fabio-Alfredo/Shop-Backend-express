const Sequelize = require("sequelize");
const config = require("./config");

let sequelize;

// Configuración de conexión con socket (si aplica)
// Si la variable de entorno use_env_variable existe, se conecta a la base de datos con la variable de entorno
// De lo contrario, se conecta a la base de datos con las variables de configuración
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize({
    database: config.database,
    username: config.db_user,
    password: config.db_pass,
    dialect: config.db_dialect,

    // Configuración de conexión con socket (si aplica)
    dialectOptions: {
      socketPath: config.db_host, // ruta de socket
    },
  });
}

module.exports = sequelize;
