const express = require('express');
const router = express.Router();

const passport = require('passport');

const validatorHandler = require('../middlewares/validator.handler');
const { loginAuthSchema, changePassword } = require('../schemas/auth.schema');

const AuthService = require('../services');

const {AuthController} = require('../controllers');
const authController = new AuthController(AuthService);

// ROUTES
router.post('/login',
  validatorHandler(loginAuthSchema, 'body'),
  passport.authenticate('local', { session: false }), // local for the local strategy
  // the passport middleware will return a user property in req object
  authController.loginUser,
);

router.post('/recovery',
  passport.authenticate('jwt', { session: false }),
  authController.recovery,
);

router.post('/change-password',
  validatorHandler(changePassword, 'body'),
  authController.changePassUser,
);


module.exports = router;
