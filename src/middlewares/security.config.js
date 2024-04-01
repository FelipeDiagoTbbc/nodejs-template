const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const csurf = require('csurf');
// const session = require('express-session');
const cookieParser = require('cookie-parser');


const app = express();


/*
 * HELMET configuration
 */
// app.disable('x-powered-by') // dont send the x-powered-by header
app.use(helmet())
app.use(helmet.frameguard({ action: 'sameorigin' })); // Set X-Frame-Options
// X-Frame-Options is now deprecated in favor of frame-src and child-src

// config for the Content Security Policy (CSP) headers using Helmet
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        "default-src": ["'none'"],
        "img-src": [
          "'self'",
          // "'unsafe-inline'",
          "data:",
          "https://*.s3.amazonaws.com",
          "https://googleads.g.doubleclick.net",
          "https://www.google-analytics.com",
          "https://www.googleoptimize.com",
          "https://www.googletagmanager.com",
          "https://www.googletagmanager.com",
          "https://optimize.google.com",
          "https://www.facebook.com",
          "https://www.google-analytics.com/",
          "https://www.google.com/",
          "https://siteintercept.qualtrics.com/",
          "https://static-assets.qualtrics.com",
          "https://www.gstatic.com",
          "https://www.google.com.co",
          "https://ssl.gstatic.com",
          "https://maps.gstatic.com/",
          "https://maps.googleapis.com",
        ],
        "script-src": [
          "'self'",
          // "'unsafe-inline'",
          // "'unsafe-eval'",
          "https://*.googleapis.com",
          "https://www.googleoptimize.com/",
          "https://siteintercept.qualtrics.com",
          "https://www.google.com/recaptcha/",
          "https://www.gstatic.com/recaptcha/",
          "https://www.googletagmanager.com/",
          "https://tagmanager.google.com/",
          "https://www.googletagmanager.com",
          "https://*.googleadservices.com",
          "https://www.google.com",
          "https://googleads.g.doubleclick.net",
          "https://*.google-analytics.com",
          "https://www.google-analytics.com/",
          "https://www.google-analytics.com/analytics.js",
          "https://connect.facebook.net/en_US/fbevents.js",
          "https://connect.facebook.net/",
          "https://tagmanager.google.com",
        ],
        "style-src": [
          "'self'",
          // "'unsafe-inline'",
          "https://*.secure.force.com",
          "https://*.googleapis.com",
          "https://*.libertyseguros.co",
          "https://*.my.salesforce-sites.com",
          "https://service.force.com",
        ],
        "object-src": ["'none'"],
        "manifest-src": ["'self'"],
        "font-src": [
          "'self'",
          "data:",
          "https://*.sandbox.my.salesforce-sites.com",
          "https://fonts.gstatic.com",
          "https://fonts.googleapis.com",
          "https://fonts.gstatic.com",
          "https://fonts.gstatic.com",
          "https://script.hotjar.com",
        ],
        "connect-src": [
          "https://*.secure.force.com",
          "https://*.googleapis.com",
          "wss://*.execute-api.us-east-1.amazonaws.com",
          "https://*.auth.us-east-1.amazoncognito.com",
          "https://*.execute-api.us-east-1.amazonaws.com",
          "https://analytics.google.com",
          "https://stats.g.doubleclick.net",
          "https://siteintercept.qualtrics.com",
          "https://*.auth.us-east-1.amazoncognito.com",
          "https://cognito-idp.us-east-1.amazonaws.com",
          "https://*.execute-api.us-east-1.amazonaws.com",
          "https://ipv4.icanhazip.com",
          "https://www.google-analytics.com",
          "https://www.google-analytics.com/j/*",
          "https://api.ipify.org",
        ],
        "frame-src": [
          "https://*.qualtrics.com",
          "http://qualtrics.com",
          "https://service.force.com",
          "https://www.google.com/recaptcha/",
          "https://recaptcha.google.com/recaptcha/",
          "https://www.googletagmanager.com/",
          "https://tagmanager.google.com/",
          "https://www.google-analytics.com",
        ],
        // Add other directives here
      },
    },
  })
);

/*
 * CORS configuration
 */
// List of trusted domains
const whitelist = ['http://localhost:3000', 'http://localhost:8080'];

// cors configuration
app.use(cors({
  origin: function (origin, callback) {
    console.log('[Security] Origin:', origin);
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  allowedHeaders: [
    'Origin', 'Accept', 'Accept-Version', 'Content-Length', 'Content-MD5',
    'Content-Type', 'Date', 'X-Api-Version', 'X-Response-Time', 'X-PINGOTHER',
    'X-CSRF-Token', 'Authorization'
  ],
  methods: '*', // 'GET,PUT,POST,DELETE,OPTIONS',
  exposedHeaders: ['X-Api-Version', 'X-Request-Id', 'X-Response-Time'],
  maxAge: 1000, // 1 day
}));

/*
 * Rate limiting configuration
 */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
// each IP address is limited to 100 requests every 15 minutes
app.use(limiter);

/*
 * Anti CRSF configuration
 */
// Configure the cookie-parser middleware
app.use(cookieParser());

// Configure the csurf middleware
app.use(csurf({ cookie: true }));

// Add the CSRF token to all responses in the X-CSRF-Token header
app.use((req, res, next) => {
  res.setHeader('X-CSRF-Token', req.csrfToken());
  next();
});

/*
 * Rate limiting configuration
 * Configuration for working with sessions
 */
// // Configure and use the express-session middleware
// app.use(session({
//   secret: 'mysecret',
//   resave: false, // Disable session resaving to prevent unnecessary session updates
//   saveUninitialized: false, // Prevent saving uninitialized sessions to conserve server resources
//   cookie: { secure: false }, // Configure the session cookie to be secure (HTTPS only)
//   proxy: true     // Trust the reverse proxy (if applicable) to properly handle secure cookies
// }));

// // Add csurf middleware to the Express application
// app.use(csurf());


module.exports = app;