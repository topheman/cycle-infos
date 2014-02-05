'use strict';

var api = require('./controllers/api'),
    index = require('./controllers'),
    request = require('request');

/**
 * Application routes
 */
module.exports = function(app) {

  // Server API Routes 
  app.get('/api/contracts',api.getProxy);
  app.get('/api/stations/:stationNumber?*',api.getProxy);
  app.get('/api/stations/*',api.getProxy);
  
  // All other routes to use Angular routing in app/scripts/app.js
  app.get('/partials/*', index.partials);
  app.get('/*', index.index);
};