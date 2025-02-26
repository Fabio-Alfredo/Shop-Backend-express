//Response handler es un manejador de respuestas que se encarga
//  de devolver una respuesta adecuada al cliente,
const responseHandler = (res, status, message = null, data = {}) => {
  return res.status(status || 200).json({
    success: true,
    message: message,
    data: data,
  });
};

module.exports = responseHandler;
