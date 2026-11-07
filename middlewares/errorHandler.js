const errorHandler = (error, req, res, next) => {
  console.error(error);

  if (res.headersSent) {
    return next(error);
  }

  const statusCode = error.statusCode || error.status || 500;
  const isDevelopment = process.env.NODE_ENV !== "production";

  res.status(statusCode).render("error", {
    pageTitle: "Error",
    statusCode,
    message: isDevelopment
      ? error.message
      : "Ha ocurrido un error inesperado. Inténtalo de nuevo más tarde.",
    details: isDevelopment ? error.stack : null,
  });
};

module.exports = errorHandler;
