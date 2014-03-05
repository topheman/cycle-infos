/**
 * Copyright (C) 2014 Christophe Rosset <tophe@topheman.com> - https://github.com/topheman/cycle-infos
 * 
 * Released under MIT License :
 * https://github.com/topheman/cycle-infos/blob/master/LICENSE
 */

/**
 * Inspired by the googleMaps.geocoder.js in streetview.topheman.com
 */

'use strict';

angular.module('googleMapsGeocoderModule',[])
        .service('googleMapsGeocoder', function() {

          var geocoder = null;

          var geocode = function(address, callback) {
            if (geocoder === null) {
              geocoder = new google.maps.Geocoder();
            }
            geocoder.geocode({'address': address}, function(results, status) {
              if (status === google.maps.GeocoderStatus.OK) {
                callback(null, results);
              }
              else {
                callback('Geocode was not successful for the following reason: ' + status);
              }
            });
          };
          
          return geocode;

        });
