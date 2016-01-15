angular.module('tradespider',['ui.router','btford.socket-io'])
.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('dax', {
    url: "/dax",
    templateUrl: "templates/dax/dax.html",
    controller: 'daxController'
  })

  .state('dax.daxperiod60', {
    url: "/daxperiod60",
    templateUrl: "templates/dax/daxperiod60.html",
  })

  .state('dax.daxperiod300', {
    url: "/daxperiod300",
    templateUrl: "templates/dax/daxperiod300.html",
  })

  .state('dax.daxperiod900', {
    url: "/daxperiod900",
    templateUrl: "templates/dax/daxperiod900.html",
  })

  .state('dow', {
    url: "/dow",
    templateUrl: "templates/dow/dow.html",
    controller: 'dowController'
  })

  .state('dow.dowperiod60', {
    url: "/dowperiod60",
    templateUrl: "templates/dow/dowperiod60.html",
  })

  .state('dow.dowperiod300', {
    url: "/dowperiod300",
    templateUrl: "templates/dow/dowperiod300.html",
  })

  .state('dow.dowperiod900', {
    url: "/dowperiod900",
    templateUrl: "templates/dow/dowperiod900.html",
  })

  .state('usfuture', {
    url: "/usfuture",
    templateUrl: "templates/usfuture/usfuture.html",
    controller: 'usfutureController'
  })

  .state('usfuture.usfutureperiod60', {
    url: "/usfutureperiod60",
    templateUrl: "templates/usfuture/usfutureperiod60.html",
  })

  .state('usfuture.usfutureperiod300', {
    url: "/usfutureperiod300",
    templateUrl: "templates/usfuture/usfutureperiod300.html",
  })

  .state('usfuture.usfutureperiod900', {
    url: "/usfutureperiod900",
    templateUrl: "templates/usfuture/usfutureperiod900.html",
  })

  .state('seng', {
    url: "/seng",
    templateUrl: "templates/seng/seng.html",
    controller: 'sengController'
  })

  .state('seng.sengperiod60', {
    url: "/sengperiod60",
    templateUrl: "templates/seng/sengperiod60.html",
  })

  .state('seng.sengperiod300', {
    url: "/sengperiod300",
    templateUrl: "templates/seng/sengperiod300.html",
  })

  .state('seng.sengperiod900', {
    url: "/sengperiod900",
    templateUrl: "templates/seng/sengperiod900.html",
  });

  $urlRouterProvider.otherwise('/dax/daxperiod60');

})

// SOCKET Config for the DEVELOPMENT instance
.factory('socket', function(socketFactory){
    var myIoSocket = io.connect(socketUrl);
  	mySocket = socketFactory({
    	ioSocket: myIoSocket
  	});
    return mySocket;
});
