'use strict';

angular.module('cycleInfosFullstackApp')
        .controller('MapCtrl', function($scope, $timeout, $window, api) {

          $scope.stations = [];
          $scope.displayRefreshButton = false;
          $scope.fitMap = true;

          var waitDisplayRefreshButton = function() {
            $timeout(function() {
              $scope.displayRefreshButton = true;
            }, 5000 || api.getCacheDuration());
          };

          waitDisplayRefreshButton();

          $scope.refreshStations = function() {
            $scope.displayRefreshButton = false;
            waitDisplayRefreshButton();
          };

          api.getStations().then(function(result) {
            $scope.stations = result.data.map(function(marker){
              marker.latitude = marker.position.lat;
              marker.longitude = marker.position.lng;
              marker.closeClick = function () {
                marker.showWindow = false;
                $scope.$apply();
                console.log('close click');
              };
              marker.onClicked = function () {
                onMarkerClicked(marker);
              };
              return marker;
            });
            $timeout(function(){
              $scope.fitMap = false;
            },5000);//@todo on an event
            console.log($scope.stations);
          });

          var onMarkerClicked = function (marker) {
            marker.showWindow = true;
            console.log('clicked');
          };

          $scope.map = {
            center: {
              latitude: 45,
              longitude: -73
            },
            zoom: 8
          };

        });
