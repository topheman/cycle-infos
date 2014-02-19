'use strict';

angular.module('cycleInfosFullstackApp')
  .service('api', ['$http','$q','localStorageService', '$angularCacheFactory', function ($http,$q,localStorageService,$angularCacheFactory) {
    
    var stationsCache = $angularCacheFactory('stationsCache', {
      maxAge: 5000,
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
      var cache     = !force === true ? stationsCache : false;
      console.log('cache',cache);
      contract  = typeof contract !== 'undefined' ? contract : getCurrentContract();
      return $http({
        'method'  : 'GET',
        'url'     : '/api/stations/?contract='+contract,
        'cache'   : cache
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
      helpers             : {
        getContractByName   : helpersGetContractByName
      }
    };
    
  }]);
