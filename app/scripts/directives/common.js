'use strict';

var myModule = angular.module('cycleInfosFullstackApp');

myModule.directive('goClick', ['$location', function($location) {
    return function(scope, element, attrs) {
      var path;

      attrs.$observe('goClick', function(val) {
        path = val;
      });

      element.bind('click', function() {
        scope.$apply(function() {
          $location.path(path);
        });
      });
    };
  }]);

myModule.directive('topheMapResize', ['$window', function($window) {
    return function(scope, element, attrs) {
      console.log('directive topheMapResize', 'scope', scope, 'element', element, 'attrs', attrs);
      var resizeHandler,
          marginTop = scope.$eval(attrs.topheMapResize).marginTop || 0,
          timer = false,
          isIPhoneIOS7 = false;//@todo iPhone detect
  
      resizeHandler = function() {
        clearTimeout(timer);
        timer = false;
//        element.style.width = $window.innerWidth+"px";
//        element.style.height = (isIPhoneIOS7 && ($window.innerHeight < $window.innerWidth)) ? $window.outerHeight+"px" : $window.innerHeight+"px";//by defaultf innerHeight but cause of ios7 safari bug, in landsacpe mode, we take outerHeight
        element.find('.angular-google-map-container').width($window.innerWidth);
        element.find('.angular-google-map-container').height((isIPhoneIOS7 && ($window.innerHeight < $window.innerWidth)) ? $window.outerHeight - marginTop : $window.innerHeight - marginTop);//by defaultf innerHeight but cause of ios7 safari bug, in landsacpe mode, we take outerHeight
        google.maps.event.trigger(element, 'resize');
        console.log('launch resize');
      };
      
      $window.addEventListener('resize', function(e) {
        if (!timer) {
          timer = setTimeout(resizeHandler, 800);
        }
      }, false);
      
      //resize at first
      resizeHandler();
      
    };
  }]);