'use strict';

angular.module('cycleInfosFullstackApp')
        .controller('MapCtrl', function($scope, api) {
          api.getStations().then(function(result){
            console.log(result);
            $scope.stations = result.data;
          });
        });
