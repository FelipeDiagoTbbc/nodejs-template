const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const app = express();

/* Helmet config */
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
          "'unsafe-inline'",
          "data:",
          "https://*.s3.amazonaws.com",
          "https://googleads.g.doubleclick.net",
          "https://www.google-analytics.com",
          "https://www.googleoptimize.com",
          "https://www.googletagmanager.com",
          "https://*.force.com",
          "https://*.salesforce.com",
          "https://*.documentforce.com",
          "https://www.googletagmanager.com",
          "https://optimize.google.com",
          "https://*.libertyseguros.co",
          "https://www.facebook.com",
          "https://www.google-analytics.com/",
          "https://www.google.com/",
          "https://siteintercept.qualtrics.com/",
          "https://static-assets.qualtrics.com",
          "https://libertyinsurance.qualtrics.com/",
          "https://www.gstatic.com",
          "https://www.google.com.co",
          "https://ssl.gstatic.com",
          "https://maps.gstatic.com/",
          "https://maps.googleapis.com",
        ],
        "script-src": [
          "https://libertysegurosandinomarket.my.salesforce-sites.com",
          "https://*.my.salesforce-sites.com",
          "https://*.secure.force.com",
          "https://libertyinsurance.qualtrics.com/",
          "https://*.qualtrics.com",
          "http://qualtrics.com",
          "'self'",
          "'unsafe-inline'",
          "'unsafe-eval'",
          "https://*.googleapis.com",
          "https://static.lightning.force.com",
          "https://*.sandbox.my.salesforce-sites.com",
          "https://*.hotjar.com",
          "https://static.hotjar.com",
          "https://script.hotjar.com",
          "https://*.salesforceliveagent.com",
          "https://static.hotjar.com",
          "https://service.force.com",
          "https://*.my.salesforce.com",
          "https://www.googleoptimize.com/",
          "https://zn7oqysgt7zlscwp0-libertyinsurance.siteintercept.qualtrics.com/SIE/",
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
          "'unsafe-inline'",
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
          "https://*.hotjar.io",
          "https://*.libertyseguros-latam.auth0.com",
          "wss://*.hotjar.com",
          "https://*.hotjar.com",
          "https://*.libertyseguros.co",
          "wss://*.execute-api.us-east-1.amazonaws.com",
          "https://*.auth.us-east-1.amazoncognito.com",
          "https://*.execute-api.us-east-1.amazonaws.com",
          "https://analytics.google.com",
          "https://*.sandbox.my.salesforce-sites.com/",
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
          "https://*.secure.force.com",
          "https://libertyinsurance.qualtrics.com/",
          "https://*.qualtrics.com",
          "http://qualtrics.com",
          "https://*.libertyseguros-latam.auth0.com/",
          "https://service.force.com",
          "https://libertyinsurance.qualtrics.com/",
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

// cors configuration
app.use(cors({
  origin: '*',
  allowedHeaders: [
    'Origin', 'Accept', 'Accept-Version', 'Content-Length', 'Content-MD5',
    'Content-Type', 'Date', 'X-Api-Version', 'X-Response-Time', 'X-PINGOTHER',
    'X-CSRF-Token', 'Authorization'
  ],
  methods: '*',
  exposedHeaders: ['X-Api-Version', 'X-Request-Id', 'X-Response-Time'],
  maxAge: 1000,
}));


//  other configuration (custom configuration)
// const allowCrossDomain = function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', '*')
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'Origin, Accept, Accept-Version, Content-Length,
//      Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization'
//   )
//   res.setHeader('Access-Control-Allow-Methods', '*')
//   res.setHeader('Access-Control-Expose-Headers', 'X-Api-Version, X-Request-Id, X-Response-Time')
//   res.setHeader('Access-Control-Max-Age', '1000')
//   res.setHeader('X-Frame-Options', 'SAMEORIGIN')
//   next()
// }

// app.use(allowCrossDomain)

module.exports = app;