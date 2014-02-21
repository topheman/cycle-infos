'use strict';

angular.module('cycleInfosFullstackApp')
        .controller('MapCtrl', function($scope, $timeout, api, googleMapsGeocoder) {

          $scope.stations = [];
          $scope.displayRefreshButton = false;
          $scope.fitMap = true;
          $scope.addressesList = [];
          $scope.showAddressesList = false;
          
          var mapInstance = null;

          var waitDisplayRefreshButton = function() {
            $timeout(function() {
              $scope.displayRefreshButton = true;
            }, 5000 || api.getCacheDuration());
          };

          $scope.refreshStations = function() {
            $scope.displayRefreshButton = false;
            refreshStations(true);
            waitDisplayRefreshButton();
          };
          
          var refreshStations = function(force){
            api.getStations(force).then(function(result) {
              $scope.stations = result.data.map(function(marker){
                marker.latitude = marker.position.lat;
                marker.longitude = marker.position.lng;
                return marker;
              });
              console.log($scope.stations);
            });
          };
          
          refreshStations();

          $scope.map = {
            center: {
              latitude: 48.856614,
              longitude: 2.352222
            },
            zoom: 14,
            options:{
              streetViewControl: false
            },
            events: {
              tilesloaded: function (map) {
                mapInstance = map;
                console.log('tilesloaded',map);
                waitDisplayRefreshButton();
              },
              'bounds_changed': function(){
                if($scope.fitMap === true){
                  $timeout(function(){
                    $scope.fitMap = false;//so that the map won't fit again when refreshing data (stay where you are)
                  },1000);
                }
              }
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
          
          $scope.centerAddress = function(latitude,longitude){
            $scope.map.center.latitude = latitude;
            $scope.map.center.longitude = longitude;
            $scope.map.zoom = 18;
            $scope.showAddressesList = false;
          };
          
          //dirty
          if(/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm|mobile|tablet/i.test(navigator.userAgent.toLowerCase())){
            if(api.getCurrentContract() === 'Paris'){
              $scope.map.options.minZoom = 14;
            }
          }

        });
