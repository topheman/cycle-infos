'use strict';

var api = require('./controllers/api'),
    index = require('./controllers'),
    request = require('request');

/**
 * Application routes
 */
module.exports = function(app) {

  // Server API Routes
//  app.get('/api/awesomeThings', api.awesomeThings);
  app.get('/api/contracts',function(req,res){
    request({
      url:'https://api.jcdecaux.com/vls/v1/contracts?apiKey={yourApiKey}',
      method:'GET'
    }, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.set({ 'Content-Type': 'application/json; charset=utf-8' });
        res.send(body);
      }
      else{
        console.error(error);
        res.status(500);
        res.send(error);
      }
    });
  });
  

  // All other routes to use Angular routing in app/scripts/app.js
  app.get('/partials/*', index.partials);
  app.get('/*', index.index);
};