const passport = require('passport');

const LocalStrategy = require('./strategies/local.strategy');
const JwtStrategy = require('./strategies/jwt.strategy');
// const GmailStrategy = require('./strategies/gmail.strategy');

passport.use(LocalStrategy);
passport.use(JwtStrategy);