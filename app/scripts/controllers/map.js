'use strict';

angular.module('cycleInfosFullstackApp')
        .controller('MapCtrl', function($scope, $timeout, api, googleMapsGeocoder) {

          $scope.stations = [];
          $scope.displayRefreshButton = false;
          $scope.fitMap = true;
          $scope.addressesList = [];
          $scope.showAddressesList = false;

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
            console.log($scope.stations);
          });

          var onMarkerClicked = function (marker) {
            marker.showWindow = true;
            console.log('clicked');
          };

          $scope.map = {
            center: {
              latitude: 48.856614,
              longitude: 2.352222
            },
            zoom: 14,
            options:{
            }
          };
          
          $scope.searchAddress = function(){
            console.log('searchAddress',this.searchLocation);
            if(this.searchLocation !== ''){
              googleMapsGeocoder(this.searchLocation,function(error,results){
                $scope.$apply(function(){
                  console.log(results);
                  $scope.addressesList = results;
                  $scope.showAddressesList = true;
                });
              });
            }
            else{
              console.log('No adress entered');
            }
          };
          
          //dirty
          if(/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm|mobile|tablet/i.test(navigator.userAgent.toLowerCase())){
            if(api.getCurrentContract() === 'Paris'){
              $scope.map.options.minZoom = 14;
            }
          }

        });
