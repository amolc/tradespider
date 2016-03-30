// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'btford.socket-io', 'ngCordova', 'angular-storage', 'ngMessages'])

.run(function($ionicPlatform, $cordovaDevice, store) {
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


    ionic.Platform.ready(function(){
    // will execute when device is ready, or immediately if the device is already ready.
      var currentPlatform = ionic.Platform.platform();
      var uuid = $cordovaDevice.getUUID();
      store.set('platform',currentPlatform);
      store.set('deviceid',uuid);
    });

  });
})

.directive('compareTo', ['$parse', function ($parse) {
  return {
      restrict: 'A',
      require : "ngModel",
      scope : { otherModelValue: "=compareTo" },
      link: function(scope, element, attributes,ngModel) {
        ngModel.$validators.compareTo = function(modelValue) {
                    return modelValue == scope.otherModelValue;
                };
                scope.$watch("otherModelValue", function() {
                    ngModel.$validate();
                });
      }
  };
}])

.service('AuthService', ['store',  '$location',function(store ,$location) {
    var user_login = store.get('user_login');
      if (user_login) {
        this.isAuthenticated = user_login;
      } else {
        this.isAuthenticated = false;
      }
      console.log( this.isAuthenticated);
  }
])

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'logincontroller'
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
  .state('app.login', {
      cache:false,
      url:'/login',
      views: {
        'menuContent': {
          templateUrl: 'templates/login.html',
          controller : 'logincontroller'
        }
      }
    })

  .state('app.playlists', {
    cache : false,
    url: '/playlists',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlists.html',
        controller: 'PlaylistsCtrl'
      }
    }
  })


  .state('app.register', {
    url: '/register',
    views: {
      'menuContent': {
      templateUrl: 'templates/register.html',
      controller : 'logincontroller'      
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
    url: '/daxperiod60',
    views: {
      'app-dax-daxperiod60': {
        templateUrl: 'templates/daxperiod60.html'
      }
    }
  })

  .state('app.dax.daxperiod300', {
    url: '/daxperiod300',
    views: {
      'app-dax-daxperiod300': {
        templateUrl: 'templates/daxperiod300.html'
      }
    }
  })

  .state('app.dax.daxperiod900', {
    url: '/daxperiod900',
    views: {
      'app-dax-daxperiod900': {
        templateUrl: 'templates/daxperiod900.html'
      }
    }
  })

  .state('app.dax.daxperiod3600', {
    url: '/daxperiod3600',
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

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        var push = PushNotification.init({
            "android": {
                "senderID": "419937285756"
            },
            "ios": {"alert": "true", "badge": "true", "sound": "true"},
            "windows": {}
        });

        push.on('registration', function(data) {
            window.localStorage.setItem("token_id", data.registrationId);
        });

        push.on('notification', function(data) {
          console.log("notification event");
            console.log(JSON.stringify(data));
            push.finish(function () {
                console.log('finish successfully called');
            });
        });

        push.on('error', function(e) {
            console.log("push error");
        });
    }
};

app.initialize();
