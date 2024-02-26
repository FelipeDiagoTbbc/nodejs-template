const config = require('../../config/config');
const mongoose = require('mongoose');

const { mongodbUser, mongodbPassword, mongodbDatabase, mongodbCluster } = config;
const mongoUri = `mongodb+srv://${mongodbUser}:${mongodbPassword}@${mongodbCluster}`;


mongoose.connect(mongoUri,{dbName: mongodbDatabase})
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// process.on("uncaughtException", (err) => {
//   console.error('[Mongoose] ',err.name, ' -> ', err.message);
//   mongoose.disconnect();
// });