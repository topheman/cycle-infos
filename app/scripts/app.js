'use strict';

angular.module('cycleInfosFullstackApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'LocalStorageModule',
  'pascalprecht.translate',
  'ngIdle'
])
  .config(['$routeProvider', '$locationProvider', '$translateProvider', 'localStorageServiceProvider', '$keepaliveProvider', '$idleProvider',function ($routeProvider, $locationProvider, $translateProvider, localStorageServiceProvider, $keepaliveProvider, $idleProvider) {
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
      'WELCOME' : 'Welcome to you, {{username}}',
      'HOME_SELECT_CHOICE' : 'Choose a service / city',
      'MAP_SEARCH_PLACEHOLDER' : 'Enter a location ...',
      'CITY': 'City',
      'CITIES': 'Cities'
    });
    $translateProvider.translations('fr',{
      'WELCOME' : 'Bienvenue à vous, {{username}}',
      'HOME_SELECT_CHOICE' : 'Choisissez un service / une ville',
      'MAP_SEARCH_PLACEHOLDER' : 'Entrez une adresse ..',
      'CITY': 'Ville',
      'CITIES': 'Villes'
    });
    $translateProvider.preferredLanguage(localStorage ? localStorage.getItem('language') : 'en');
    localStorageServiceProvider.setPrefix('');
    $idleProvider.idleDuration(5);
    $idleProvider.warningDuration(5);
    $keepaliveProvider.interval(10);
  }]);