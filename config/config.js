require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'development',
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 8080,
  host: process.env.HOST || 'http://localhost',
  apiVersion: process.env.API_VERSION || 'v1',

  // MongoDB
  mongodbUser: process.env.MONGODB_USER,
  mongodbPassword: process.env.MONGODB_PASSWORD,
  mongodbDatabase: process.env.MONGODB_DATABASE,
  mongodbCluster: process.env.MONGODB_CLUSTER,

  // API KEY
  apiKey: process.env.API_KEY || 12345,

  // JWT
  jwtSecret: process.env.JWT_SECRET,
  jwtLifeTime: process.env.JWT_LIFETIME || 3600,

};

module.exports = config;