'use strict';

angular.module('cycleInfosFullstackApp')
  .service('apiPooling',['api','localStorageService',function(api, localStorageService){
    
    /** constants */
    var DEFAULT_POOLING_INTERVAL = 5;
    
    /** private vars */
    var poolingActive, stations, lastUpdate;
    
    /** public methods */
    var setPoolingInterval = function(poolingInterval){
      localStorageService.add('poolingInterval',poolingInterval);
    };
    
    var getPoolingInterval = function(){
      return localStorageService.get('poolingInterval') || DEFAULT_POOLING_INTERVAL;
    };
    
    var setCurrentContract = function(currentContract){
      localStorageService.add('currentContract',currentContract);
    };
    
    var getCurrentContract = function(){
      return localStorageService.get('currentContract');
    };
    
    var launch = function(){
      
    };
    
    /** private methods */
    var update = function(){
      
    };
    
  }]);