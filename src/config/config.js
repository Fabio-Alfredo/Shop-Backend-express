require("dotenv").config();
const { DATABASE, DB_USER, DB_PASSWORD, DB_HOST, PORT } = process.env;

const validEnv = (env, name) => {
  if (!env) throw new Error(`${name} is required`);

  return env;
};

const config = {
  port: validEnv(PORT, "PORT"),
  database: validEnv(DATABASE, "DATABASE"),
  db_user: validEnv(DB_USER, "DB USER"),
  db_pass: validEnv(DB_PASSWORD, "DB PASSWORD"),
  db_host: validEnv(DB_HOST, "HOST"),
};

module.exports = config