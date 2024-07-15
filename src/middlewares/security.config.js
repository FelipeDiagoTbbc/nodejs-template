const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
const csurf = require('csurf')
// const session = require('express-session');
const cookieParser = require('cookie-parser')

const app = express()

/*
 * HELMET configuration
 */
// app.disable('x-powered-by') // dont send the x-powered-by header
app.use(helmet())
app.use(helmet.hidePoweredBy())
app.use(helmet.frameguard({ action: 'deny' }))
app.use(helmet.xssFilter())
app.use(helmet.noSniff())
app.use(helmet.ieNoOpen())
app.use(helmet.dnsPrefetchControl())
app.use(helmet.noCache())

// add HSTS header, hsts -> HTTP Strict Transport Security
app.use(
  helmet.hsts({
    maxAge: 31536000, // 31536000 segundos = 1 year
    includeSubDomains: true, // Optional: includes all subdomains
    preload: true // Optional: submit the domain to the HSTS preload list
  })
)

// config for the Content Security Policy (CSP) headers using Helmet
// config for the Content Security Policy (CSP) headers using Helmet
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        'default-src': ["'none'"],
        'img-src': [
          "'self'",
          // "'unsafe-inline'",
          'data:', // Allow data: images
          'https://*.s3.amazonaws.com',
          'https://www.google.com/',
          'https://www.gstatic.com',
          'https://www.google.com.co'
        ],
        'script-src': [
          "'self'",
          // "'unsafe-inline'",
          // "'unsafe-eval'",
          'https://*.googleapis.com',
          'https://www.googleoptimize.com/',
          'https://www.google.com/recaptcha/',
          'https://www.gstatic.com/recaptcha/'
        ],
        'style-src': [
          "'self'",
          "'unsafe-inline'", // Allow inline styles
          'https://*.googleapis.com',
          'https://www.google.com/recaptcha/'
        ],
        'object-src': ["'none'"],
        'manifest-src': ["'self'"],
        'font-src': ["'self'", 'https://fonts.gstatic.com', 'https://fonts.googleapis.com'],
        'connect-src': [
          'https://*.googleapis.com',
          'https://*.s3.amazonaws.com',
          'https://*.execute-api.us-east-1.amazonaws.com',
          'https://*.auth.us-east-1.amazoncognito.com',
          'https://analytics.google.com',
          'https://www.google.com/recaptcha/',
          'https://www.google-analytics.com',
          'https://www.google-analytics.com/j/*',
          'https://www.datos.gov.co',
          'https://api.mapbox.com',
          'https://events.mapbox.com'
        ],
        'frame-src': [
          'https://*.s3.amazonaws.com', // Allow iframes from the s3 bucket
          'https://www.google.com/recaptcha/',
          'https://recaptcha.google.com/recaptcha/',
          'https://www.google-analytics.com'
        ],
        'frame-ancestors': ["'none'"],
        'worker-src': ["'self'", 'blob:'],
        'report-uri': ['https://csp.withgoogle.com/csp/recaptcha/1']
      }
    }
  })
)
/*
* AWS CLOUDFRONT CSP CONFIGURATION:
default-src 'none';
img-src 'self' data: https://*.s3.amazonaws.com https://www.google.com/ https://www.gstatic.com https://www.google.com.co;
script-src 'self' https://*.googleapis.com https://www.googleoptimize.com/ https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/;
style-src 'self' 'unsafe-inline' https://*.googleapis.com https://www.google.com/recaptcha/;
object-src 'none'; manifest-src 'self'; font-src 'self' https://fonts.gstatic.com https://fonts.googleapis.com;
connect-src https://*.googleapis.com https://*.s3.amazonaws.com https://*.execute-api.us-east-1.amazonaws.com https://*.auth.us-east-1.amazoncognito.com https://analytics.google.com https://www.google.com/recaptcha/ https://www.google-analytics.com https://www.google-analytics.com/j/* https://api.mapbox.com https://www.datos.gov.co https://events.mapbox.com;
frame-src https://www.google.com/recaptcha/ https://recaptcha.google.com/recaptcha/ https://www.google-analytics.com https://*.s3.amazonaws.com;
frame-ancestors 'none';
worker-src 'self' blob:;
report-uri https://csp.withgoogle.com/csp/recaptcha/1;
*/

/*
 * CORS configuration
 */
// List of trusted domains
const whitelist = ['http://localhost:3000', 'http://localhost:8080']

// cors configuration
app.use(
  cors({
    origin: function (origin, callback) {
      const allowedApiPattern = /^https:\/\/.*\.execute-api\.us-east-1\.amazonaws\.com$/
      if (!origin || whitelist.indexOf(origin) !== -1 || allowedApiPattern.test(origin)) {
        callback(null, true)
      } else {
        callback(new Error('[CORS] Not allowed by CORS: ' + origin), false)
      }
    },
    allowedHeaders: [
      'Origin',
      'Accept',
      'Accept-Version',
      'Content-Length',
      'Content-MD5',
      'Content-Type',
      'Date',
      'X-Api-Version',
      'X-Response-Time',
      'X-PINGOTHER',
      'X-CSRF-Token',
      'Authorization'
    ],
    methods: '*', // 'GET,PUT,POST,DELETE,OPTIONS',
    exposedHeaders: ['X-Api-Version', 'X-Request-Id', 'X-Response-Time'],
    maxAge: 1000 // 1 day
  })
)

/*
 * Rate limiting configuration
 */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
})
// each IP address is limited to 100 requests every 15 minutes
app.use(limiter)

/*
 * Anti CRSF configuration
 */
// Configure the cookie-parser middleware
app.use(cookieParser())

// Configure the csurf middleware
app.use(csurf({ cookie: true }))

// Add the CSRF token to all responses in the X-CSRF-Token header
app.use((req, res, next) => {
  res.setHeader('X-CSRF-Token', req.csrfToken())
  next()
})

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

/*
 * Remove header server
 */
app.use((req, res, next) => {
  res.removeHeader('Server')
  next()
})

module.exports = app
