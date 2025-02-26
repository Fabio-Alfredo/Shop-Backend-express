//Error handler es un middleware que se encarga
// de manejar los errores que se generan en la aplicacion.

const errorHandler = (err, req, res, next) => {
  return res
    .status(err.status || 500)
    .json({ error: err.message || "Something went wrong" });
};

module.exports = errorHandler;
