require("dotenv").config();
const { PORT, DATABASE, DB_USER, DB_PASSWORD, DB_HOST, DB_DIALECT, PASS_SALT } =
  process.env;

const validEnv = (env, name) => {
  if (!env) throw new Error(`${name} is required`);

  return env;
};

const config = {
  development: {
    username: validEnv(DB_USER, "DB_USER"),
    password: validEnv(DB_PASSWORD, "DB_PASSWORD"),
    database: validEnv(DATABASE, "DATABASE"),
    socketPath: validEnv(DB_HOST, "DB_HOST"),
    dialect: validEnv(DB_DIALECT, "DB_DIALECT"), 
    salt: validEnv(PASS_SALT, "SALT ENCRYPT"),
  },
  production: {
    port: validEnv(PORT, "PORT"),
    database: validEnv(DATABASE, "DATABASE"),
    db_user: validEnv(DB_USER, "DB USER"),
    db_pass: validEnv(DB_PASSWORD, "DB PASSWORD"),
    db_host: validEnv(DB_HOST, "HOST"),
    db_dialect: validEnv(DB_DIALECT, "DB_DIALECT"),
    salt: validEnv(PASS_SALT, "SALT ENCRYPT"),
  },
};

module.exports = config;
