module.exports = {
  errorHandler: (error, request, response, next) => {
    if (error.name === 'MongoServerError') {
      return next(error);
    }

    if (error.isJoi) { // validation error, send 400 status code, bad request
      console.error('\n[ErrorHandler] ', error.name, ' -> ', error.message);
      return response.status(400).send("Validation error. "+ error.message);
    }

    if (error.name === 'ClientError') { // client error, send the status of the client error
      console.error('\n[ErrorHandler] *', error.name, ' -> ', error.message);
      return response.status(error.status).send(error.message);
    }

    console.error('\n[ErrorHandler] ', error.name, ' -> ', error.message);
    console.error('[ErrorHandler] ', error.stack);
    response.status(500).send("An error occurred. "+ error.message);
  },

  // routes not found
  notFound: (req, res, next) => {
    res.status(404).send("<h1>404 Not Found</h1>");
    next();
  },

  // MongoServerError
  mongoError: (err, req, res, next) => {
    console.error('[MongoServerError] ', err.name, ' -> ', err.message);
    res.status(500).json({ message: 'An unexpected error occurred' });
  }
}