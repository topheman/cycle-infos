'use strict';

var path = require('path');

var rootPath = path.normalize(__dirname + '/../../..');

module.exports = {
  jcdecauxApiKey : process.env.jcdecauxApiKey,
  root: rootPath,
  port: process.env.PORT || 3000
};