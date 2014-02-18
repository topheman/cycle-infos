'use strict';

angular.module('cycleInfosFullstackApp')
  .controller('HomeCtrl', function ($scope, $http, localStorageService,$translate, api) {
    $scope.language = localStorageService.get('language') || 'en';
    api.getContracts().then(function(result){
      $scope.contracts = result;
      console.log(result);
    });
    
    //change language at runtime in settings and save it in localStorage
    $scope.$watch('language',function(value){
      localStorageService.add('language',value);
      $translate.use(value);
    });
  });
