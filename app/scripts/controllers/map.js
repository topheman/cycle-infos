'use strict';

angular.module('cycleInfosFullstackApp')
        .controller('MapCtrl', function($scope, $timeout, $window, api) {

          $scope.displayRefreshButton = false;

          waitDisplayRefreshButton();

          $scope.refreshStations = function() {
            $scope.displayRefreshButton = false;
            waitDisplayRefreshButton();
          };

          api.getStations().then(function(result) {
            console.log(result);
            $scope.stations = result.data;
          });

          function waitDisplayRefreshButton() {
            $timeout(function() {
              $scope.displayRefreshButton = true;
            }, 5000 || api.getCacheDuration());
          }
          
          /** map resize */
          console.log('$window',$window);

          $scope.map = {
            center: {
              latitude: 45,
              longitude: -73
            },
            zoom: 8
          };

        });
