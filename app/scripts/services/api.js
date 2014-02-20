'use strict';

angular.module('cycleInfosFullstackApp')
  .service('api', ['$http','$q','localStorageService', '$angularCacheFactory', function ($http,$q,localStorageService,$angularCacheFactory) {
    
    var CACHE_DURATION = 900000;
    
    var stationsCache = $angularCacheFactory('stationsCache', {
      maxAge: CACHE_DURATION,
      storageMode: 'localStorage',
      verifyIntegrity: true
    });
    
    var setCurrentContract = function(currentContract){
      return localStorageService.set('currentContract',currentContract);
    };
    
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
    
    var getStations = function(force, contract){
      
      contract  = typeof contract !== 'undefined' ? contract : getCurrentContract();
      var url = '/api/stations/?contract='+contract;
      
      if(force === true){
        stationsCache.remove(url);
      }
      
      return $http({
        'method'  : 'GET',
        'url'     : url,
        'cache'   : stationsCache
      });
      
    };
    
    var helpersGetContractByName = function(contractName, contractList){
      for(var i=0; i<contractList.length; i++){
        if(contractName === contractList[i].name){
          return contractList[i];
        }
      }
      return null;
    };
    
    return {
      setCurrentContract  : setCurrentContract,
      getCurrentContract  : getCurrentContract,
      getContracts        : getContracts,
      getStations         : getStations,
      getCacheDuration    : function(){
        return CACHE_DURATION;
      },
      helpers             : {
        getContractByName   : helpersGetContractByName
      }
    };
    
  }]);
