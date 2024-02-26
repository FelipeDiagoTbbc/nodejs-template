const { Strategy } = require('passport-local');

const AuthService = require('../../../services/authService');

/**
 * Local strategy is just used for login
 */
const LocalStrategy = new Strategy(
  {
    usernameField: 'email', // the property to look for in the request
    passwordField: 'password'
  },
  async (email, password, done) => {
    try{
      const user = await AuthService.getUser(email, password);
      done(null, user);
    }catch(error){
      done(error, false);
    }
  }
);

module.exports = LocalStrategy;
