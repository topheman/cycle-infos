'use strict';

angular.module('cycleInfosFullstackApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'LocalStorageModule',
  'pascalprecht.translate'
])
  .config(['$routeProvider', '$locationProvider', '$translateProvider', 'localStorageServiceProvider',function ($routeProvider, $locationProvider, $translateProvider, localStorageServiceProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/home',
        controller: 'HomeCtrl'
      })
      .when('/map', {
        templateUrl: 'partials/map',
        controller: 'MapCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
      
    $locationProvider.html5Mode(true);

    $translateProvider.translations('en',{
      'WELCOME' : 'Welcome to you, {{username}}'
    });
    $translateProvider.translations('fr',{
      'WELCOME' : 'Bienvenue à vous, {{username}}'
    });
    $translateProvider.preferredLanguage(localStorage ? localStorage.getItem('language') : 'en');
    localStorageServiceProvider.setPrefix('');
  }]);