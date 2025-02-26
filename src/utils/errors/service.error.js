//una clase extendida de Error para manejar los errores de los servicios
//se le pasa el mensaje y el codigo del error
class ServiceError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

module.exports = ServiceError;
