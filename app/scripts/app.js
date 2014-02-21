'use strict';

angular.module('cycleInfosFullstackApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'LocalStorageModule',
  'pascalprecht.translate',
  'jmdobry.angular-cache',
  'google-maps',
  'googleMapsGeocoderModule'
])
  .config(['$routeProvider', '$locationProvider', '$translateProvider', 'localStorageServiceProvider', '$angularCacheFactoryProvider',function ($routeProvider, $locationProvider, $translateProvider, localStorageServiceProvider, $angularCacheFactoryProvider) {
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
      'MAP_SEARCH_LOCATION_PLACEHOLDER' : 'Enter a location ...',
      'MAP_SEARCH_STATION_PLACEHOLDER' : 'Enter a station ...',
      'MAP_CHOOSE_LOCATION' : 'Choose a location',
      'MAP_CHOOSE_STATION' : 'Choose a station',
      'CITY': 'City',
      'CITIES': 'Cities',
      'AVAILABLE_BIKES' : 'Available bikes',
      'AVAILABLE_STANDS' : 'Available stands',
      'LABEL_TOPHEMAN_STREETVIEW' : 'See in Topheman StreetView',
      'LAST_UPDATED' : 'Last updated'
    });
    $translateProvider.translations('fr',{
      'WELCOME' : 'Bienvenue à vous, {{username}}',
      'HOME_SELECT_CHOICE' : 'Choisissez un service / une ville',
      'MAP_SEARCH_LOCATION_PLACEHOLDER' : 'Entrez une adresse ..',
      'MAP_CHOOSE_LOCATION' : 'Choisissez une adresse',
      'MAP_CHOOSE_STATION' : 'Choisissez une borne',
      'CITY': 'Ville',
      'CITIES': 'Villes',
      'AVAILABLE_BIKES' : 'Vélos libres',
      'AVAILABLE_STANDS' : 'Places libres',
      'LABEL_TOPHEMAN_STREETVIEW' : 'Voir sur Topheman StreetView',
      'LAST_UPDATED' : 'Dernière mise à jour'
    });
    $translateProvider.preferredLanguage(localStorage ? localStorage.getItem('language') : 'en');
    localStorageServiceProvider.setPrefix('');
    $angularCacheFactoryProvider.setCacheDefaults({
        maxAge: 10,
        deleteOnExpire: 'aggressive'
    });
  }]);