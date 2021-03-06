/**
 * Copyright (C) 2014 Christophe Rosset <tophe@topheman.com> - https://github.com/topheman/cycle-infos
 * 
 * Released under MIT License :
 * https://github.com/topheman/cycle-infos/blob/master/LICENSE
 */

'use strict';

angular.module('cycleInfosFullstackApp')
  .controller('HomeCtrl', function ($scope, localStorageService,$translate, $location, api) {
    
    $scope.language = localStorageService.get('language') || 'en';
    
    api.getContracts().then(function(result){
      $scope.contracts = result.sort(function(a,b){
        return a.name < b.name ? -1 : 1;
      });
      $scope.contract = api.helpers.getContractByName(localStorageService.get('currentContract'), $scope.contracts);
    });
    
    $scope.goToMap = function(contract){
      api.setCurrentContract(contract);
      $location.path('/map');
    };
    
    //change language at runtime in settings and save it in localStorage
    $scope.$watch('language',function(value){
      localStorageService.add('language',value);
      $translate.use(value);
    });
  });
