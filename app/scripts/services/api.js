'use strict';

angular.module('cycleInfosFullstackApp')
  .service('api', ['$http','$q','localStorageService',function ($http,$q,localStorageService) {
      
    var getCurrentContract = function(){
      return localStorageService.get('currentContract');
    };
    
    //get the contracts with caching
    var getContracts = function(force){
      var def = $q.defer();
      if(localStorageService.get('contracts') === null || force === true){
        $http({
          'method' : 'GET',
          'url' : '/api/contracts'
        }).then(function(result){
          localStorageService.add('contracts',result.data);
          def.resolve(result.data);
        },function(result){
          def.reject(result);
        });
      }
      else{
        def.resolve(localStorageService.get('contracts'));
      }
      return def.promise;
    };
    
    return {
      getCurrentContract  : getCurrentContract,
      getContracts        : getContracts
    };
  }]);
