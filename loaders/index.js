require('dotenv').config();
require('../models/index');
const expressLoader = require('./express');

module.exports = async ({ expressApp }) => {
  await expressLoader({ app: expressApp });
  console.log('Express Intialized');

  // ... more loaders can be here

  // ... Initialize agenda
  // ... or Redis, or whatever you want
}