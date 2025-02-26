const userRepository = require("../repositories/user.repository");
const ServiceError = require("../utils/errors/service.error");
const UserCodes = require("../utils/errors/errorsCodes/user.codes");
const { generateToken } = require("../utils/security/jwt.utl");

/**
 * Registro de un nuevo usuario
 * 
 * @param {object} user - datos del usuario
 * @returns {Promise<Object>} usuario creado
 * @throws {ServiceError} error con detalles del problema
 */
const createUser = async (user) => {
  const t = await userRepository.startTransaction();
  try {
    //Validation de la existencia de un usuario con ese email
    const existUser = await userRepository.existUser(user.email);
    //si existe se lanza una excepcion
    if (existUser)
      throw new ServiceError("Email already in use", UserCodes.ALREADY_EXISTS);

    //Creacion de usuario
    const newUser = await userRepository.create(user, t);

    //se confirma la transaccion
    //se retorna el usuario creado
    await t.commit();
    return newUser;
  } catch (e) {
    //en caso de error se hace rollback de la transaccion
    //se lanza una excepcion
    await t.rollback();
    throw new ServiceError(
      e.message || "Internal server error while register user",
      e.code || UserCodes.NOT_FOUND
    );
  }
};

/**
 * Autenticacion de un usuario
 * 
 * @param {string} email - email del usuario
 * @param {string} password - contraseña del usuario
 * @returns {Promise<Object>} token de autenticacion
 * @throws {ServiceError} error con detalles del problema
 */
const authUser = async (email, password) => {
  try {
    //se busca el usuario por email
    const user = await userRepository.existUser(email);
    //si no existe o si la contraseña es incorrecta se lanza una excepcion
    if (!user || !(await user.validatePassword(password)))
      throw new ServiceError(
        "Invalid credentials ",
        UserCodes.INVALID_CREDENTIALS
      );

    //se genera un token con la informacion del usuario
    const roles = user.Roles.map((role) => role.id);
    const token = generateToken({
      id: user.id,
      email: user.email,
      roles: roles,
    });

    //se retorna el token
    return token;
  } catch (e) {
    //en caso de error se lanza una excepcion
    throw new ServiceError(
      e.message || "Internal server error while register user",
      e.code || UserCodes.NOT_FOUND
    );
  }
};

module.exports = {
  createUser,
  authUser,
};
