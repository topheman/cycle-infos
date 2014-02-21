'use strict';

/**
 * Inspired by the googleMaps.geocoder.js in streetview.topheman.com
 */

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
