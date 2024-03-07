const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { StatusCodes } = require('http-status-codes')
const logger = require("morgan");
const securityConfig = require('./src/middlewares/security.config');
const {checkApiKey} = require('./src/middlewares/auth.handler');


// middlewares
const errors = require('./src/middlewares/error.handler');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(logger("dev"));
app.use(securityConfig);


// routes use
app.use('/api', require('./src/routes'))
app.get('/', (req, res) => {
  console.log('PRUEBA')
  res.status(StatusCodes.OK).send({
    applicationName: 'App',
    teamDevelopment: 'TBBC Team'
  })
})
app.get('/home',
  checkApiKey,
  (req, res) => {
    res.status(StatusCodes.OK).send({
      applicationName: 'App',
      teamDevelopment: 'TBBC Team'
    })
  }
)

// auth
require('./src/utils/auth');

// errors middleware
app.use(errors.notFound);
app.use(errors.errorHandler);

module.exports = app
