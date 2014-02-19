'use strict';

angular.module('cycleInfosFullstackApp')
        .controller('MapCtrl', function($scope, $idle, $timeout) {
          $idle.watch();
          console.log('MapCtrl');

          $scope.$on('$idleStart', function() {
            console.log('$idleStart', 'inactive');
          });

          $scope.$on('$idleEnd', function() {
            console.log('$idleEnd', 'active again');
          });

          $scope.$on('$idleTimeout', function() {
            console.log('$idleTimeout', 'inactive for a long time');
          });

        });
