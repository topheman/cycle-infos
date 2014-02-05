'use strict';

var request = require('request'),
    config = require('../config/config'),
    baseUrl = 'https://api.jcdecaux.com/vls/v1',
    apiKey = config.jcdecauxApiKey;

var proxy = function(){
  return function(req,res){
    request({
      url     : baseUrl+req.url.replace(/\/api/,'')+(req.url.indexOf('?') > -1 ? '&' : '?')+'apiKey='+apiKey,
      method  : 'GET'
    },function(error, response, body){
      res.set({ 'Content-Type': 'application/json; charset=utf-8' });
      if(!error && response.statusCode == 200){
        res.status(200);
        res.send(body);
      }
      else{
        console.error(error);
        res.status(500);
        res.send(error);
      }
    });
  };
};

/**
 * Get awesome things
 */
exports.getProxy = proxy();