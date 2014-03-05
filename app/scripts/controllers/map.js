/**
 * Copyright (C) 2014 Christophe Rosset <tophe@topheman.com> - https://github.com/topheman/cycle-infos
 * 
 * Released under MIT License :
 * https://github.com/topheman/cycle-infos/blob/master/LICENSE
 */

'use strict';

angular.module('cycleInfosFullstackApp')
        .controller('MapCtrl', function($scope, $timeout, $location, api, googleMapsGeocoder) {

          if(api.getCurrentContract() === null){
            $location.path('/');
          }
          else{
            $scope.currentContract = api.getCurrentContract();
          }

          $scope.displayRefreshButton = false;
          
          $scope.stations = {
            search  : '',
            show    : false,
            list    : []
          };
          $scope.addresses = {
            search  : '',
            show    : false,
            list    : []
          };
          
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
              $scope.stations.list = result.data.map(function(marker){
                marker.latitude = marker.position.lat;
                marker.longitude = marker.position.lng;
                return marker;
              });
              console.log($scope.stations.list);
            });
          };
          
          refreshStations();
          
          $scope.closeLists = function(){
            $scope.stations.show = false;
            $scope.addresses.show = false;
          };

          $scope.map = {
            fit : true,
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
                if($scope.map.fit === true){
                  $timeout(function(){
                    $scope.map.fit = false;//so that the map won't fit again when refreshing data (stay where you are)
                  },1000);
                }
              }
            }
          };
          
          $scope.searchAddress = function(){
            console.log('searchAddress',this.addresses.search);
            if(this.addresses.search !== ''){
              googleMapsGeocoder(this.addresses.search,function(error,results){
                $scope.$apply(function(){
                  console.log(results);
                  $scope.addresses.list = results;
                  $scope.stations.show = false;
                  $scope.addresses.show = true;
                });
              });
            }
            else{
              console.log('No adress entered');
            }
          };
          
          $scope.$watch('stations.search',function(value){
            console.log('station ?',value);
            if(value !== ''){
              $scope.stations.show = true;
              $scope.addresses.show = false;
            }
            else{
              $scope.stations.show = false;
              $scope.addresses.show = false;
            }
          });
          
          $scope.centerAddress = function(latitude,longitude){
            $scope.map.center.latitude = latitude;
            $scope.map.center.longitude = longitude;
            $scope.map.zoom = 18;
            $scope.addresses.show = false;
            $scope.stations.show = false;
          };
          
          //dirty
          if(/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm|mobile|tablet/i.test(navigator.userAgent.toLowerCase())){
            if(api.getCurrentContract() === 'Paris'){
              $scope.map.options.minZoom = 14;
            }
          }

        });
