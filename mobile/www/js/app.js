// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'btford.socket-io'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.dax', {
    url: '/dax/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/dax.html',
        controller: 'daxController'
      }
    }
  })

  .state('app.dax.daxperiod60', {
    url: '/daxperiod60/',
    views: {
      'app-dax-daxperiod60': {
        templateUrl: 'templates/daxperiod60.html'
      }
    }
  })

  .state('app.dax.daxperiod300', {
    url: '/daxperiod300/',
    views: {
      'app-dax-daxperiod300': {
        templateUrl: 'templates/daxperiod300.html'
      }
    }
  })

  .state('app.dax.daxperiod900', {
    url: '/daxperiod900/',
    views: {
      'app-dax-daxperiod900': {
        templateUrl: 'templates/daxperiod900.html'
      }
    }
  })

  .state('app.dax.daxperiod3600', {
    url: '/daxperiod3600/',
    views: {
      'app-dax-daxperiod3600': {
        templateUrl: 'templates/daxperiod3600.html'
      }
    }
  });  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/playlists');
})

// SOCKET Config for the DEVELOPMENT instance
.factory('socket', function(socketFactory){
    var myIoSocket = io.connect(socketUrl);
    mySocket = socketFactory({
      ioSocket: myIoSocket
    });
    return mySocket;
});
