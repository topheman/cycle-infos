'use strict';

angular.module('cycleInfosFullstackApp')
  .controller('HomeCtrl', function ($scope, $http, localStorageService) {
    $scope.language = localStorageService.get('language') || 'en';
  });
