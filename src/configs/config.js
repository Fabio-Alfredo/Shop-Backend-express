require("dotenv").config();
const {
  PORT,
  DATABASE,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_DIALECT,
  PASS_SALT,
  JWT_SECRET,
  STRIPE_SECRET,
  NODE_ENV,
} = process.env;

//valida que las variables de entorno no esten vacias
//si estan vacias lanza una excepcion
//de lo contrario retorna la variable
const validEnv = (env, name) => {
  if (!env) throw new Error(`${name} is required`);

  return env;
};

//configuracion de las variables de entorno
//para desarrollo y produccion
const config = {
  development: {
    db_user: validEnv(DB_USER, "DB USER"),
    db_pass: validEnv(DB_PASSWORD, "DB PASSWORD"),
    database: validEnv(DATABASE, "DATABASE"),
    db_host: validEnv(DB_HOST, "HOST"),
    db_dialect: validEnv(DB_DIALECT, "DB_DIALECT"),
    port: validEnv(PORT, "PORT"),
    salt: validEnv(PASS_SALT, "SALT ENCRYPT"),
    jsw: validEnv(JWT_SECRET, "JWT_SECRET"),
    stripe: validEnv(STRIPE_SECRET, "STRIPE_SECRET"),
  },
  production: {
    db_user: validEnv(DB_USER, "DB USER"),
    db_pass: validEnv(DB_PASSWORD, "DB PASSWORD"),
    database: validEnv(DATABASE, "DATABASE"),
    db_host: validEnv(DB_HOST, "HOST"),
    db_dialect: validEnv(DB_DIALECT, "DB_DIALECT"),
    port: validEnv(PORT, "PORT"),
    salt: validEnv(PASS_SALT, "SALT ENCRYPT"),
    jsw: validEnv(JWT_SECRET, "JWT_SECRET"),
    stripe: validEnv(STRIPE_SECRET, "STRIPE_SECRET"),
  },
};

const currentEnv = config[NODE_ENV] || config.development;

module.exports = currentEnv;
