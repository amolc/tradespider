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

  $urlRouterProvider.otherwise('/home');

})