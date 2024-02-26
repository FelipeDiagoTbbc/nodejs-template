module.exports = {
  errorHandler: (error, request, response, next) => {
    console.error('ErrorHandler: ',error.message, error.name);
    response.status(500).send("An error occurred");
  },

  // routes not found
  notFound: (req, res, next) => {
    res.status(404).send("<h1>404 Not Found</h1>");
    next();
  },
}