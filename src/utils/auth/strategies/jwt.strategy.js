const {Strategy, ExtractJwt} = require('passport-jwt');
const config = require('../../../../config/config');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret,
};


const JwtStrategy = new Strategy(
  options,
  async (payload, done) => {
    done(null, payload);
    // here the payload is return and populated into the req.user property,
    // and the payload is the same that we defined in the auth.router.js file,
  }
);

module.exports = JwtStrategy;