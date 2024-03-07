function validatorHandler(schema, property) {
  return (req, res, next) => {
    const { error } = schema.validate(req[property], { abortEarly: false });
    if(error){
      next(error);
    }
    next();
  }
}

module.exports = validatorHandler;
