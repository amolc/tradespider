// Invoke 'strict' JavaScript mode
'use strict';

// Set the main application name
var tradespiderAdmin = 'tradespiderAdmin';


// Create the main application
var SuperadminApplicationModule = angular.module( tradespiderAdmin, ['ui.router','btford.socket-io', 'ui.bootstrap']);

SuperadminApplicationModule
.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('home', {
    url: "/home",
    templateUrl: "templates/home.html",
    controller : "homeController"
  })

  .state('markets', {
    url: "/markets",
    templateUrl: "templates/markets.html",
    controller : "marketsController"
  })

  .state('markets.dax', {
    url: "/dax",
    templateUrl: "templates/dax.html"
  })

  .state('markets.dow', {
    url: "/dow",
    templateUrl: "templates/dow.html"
  })

  $urlRouterProvider.otherwise('/home');

})