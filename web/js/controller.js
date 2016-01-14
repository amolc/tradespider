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
})

.controller('daxController', function ($scope, $state, socket) {

  $scope.daxData = function (page) {
      socket.emit('get dax data', {'page': page});
  };

  socket.on('dax data', function(data){
    if($state.current.name === 'dax.daxperiod60'){
      $scope.dax_1s = data.dax;
    }else if($state.current.name === 'dax.daxperiod300'){
      $scope.dax_5s = data.dax;
    }else if($state.current.name === 'dax.daxperiod900'){
      $scope.dax_15s = data.dax;
    }
  });

  socket.on('one minute dax-report', function(oneData){
    if($state.current.name === 'dax.daxperiod60'){
      $scope.dax_1s.push({
        'created_on': oneData.created_on,
        'summary': oneData.summary.toLowerCase(),
        'moving_averages': oneData.moving_averages.toLowerCase(),
        'technical_indicators': oneData.technical_indicators.toLowerCase(),
        'value': oneData.value
      });
    }
  });

  socket.on('five minute dax-report', function(fiveData){
    if($state.current.name === 'dax.daxperiod300'){
      $scope.dax_5s.push({
        'created_on': fiveData.created_on,
        'summary': fiveData.summary.toLowerCase(),
        'moving_averages': fiveData.moving_averages.toLowerCase(),
        'technical_indicators': fiveData.technical_indicators.toLowerCase(),
        'value': fiveData.value
      });
    }
  });

  socket.on('fifteen minute dax-report', function(fifteenData){
    if($state.current.name === 'dax.daxperiod900'){
      $scope.dax_15s.push({
        'created_on': fifteenData.created_on,
        'summary': fifteenData.summary.toLowerCase(),
        'moving_averages': fifteenData.moving_averages.toLowerCase(),
        'technical_indicators': fifteenData.technical_indicators.toLowerCase(),
        'value': fifteenData.value
      });
    }
  });

})

.controller('dowController', function ($scope, $state, socket) {

  $scope.dowData = function (page) {
      socket.emit('get dow data', {'page': page});
  };

  socket.on('dow data', function(data){
    if($state.current.name === 'dow.dowperiod60'){
      $scope.dow_1s = data.dow;
    }else if($state.current.name === 'dow.dowperiod300'){
      $scope.dow_5s = data.dow;
    }else if($state.current.name === 'dow.dowperiod900'){
      $scope.dow_15s = data.dow;
    }
  });

  socket.on('one minute dow-report', function(oneData){
    if($state.current.name === 'dow.dowperiod60'){
      $scope.dow_1s.push({
        'created_on': oneData.created_on,
        'summary': oneData.summary.toLowerCase(),
        'moving_averages': oneData.moving_averages.toLowerCase(),
        'technical_indicators': oneData.technical_indicators.toLowerCase(),
        'value': oneData.value
      });
    }
  });

  socket.on('five minute dow-report', function(fiveData){
    if($state.current.name === 'dow.dowperiod300'){
      $scope.dow_5s.push({
        'created_on': fiveData.created_on,
        'summary': fiveData.summary.toLowerCase(),
        'moving_averages': fiveData.moving_averages.toLowerCase(),
        'technical_indicators': fiveData.technical_indicators.toLowerCase(),
        'value': fiveData.value
      });
    }
  });

  socket.on('fifteen minute dow-report', function(fifteenData){
    if($state.current.name === 'dow.dowperiod900'){
      $scope.dow_15s.push({
        'created_on': fifteenData.created_on,
        'summary': fifteenData.summary.toLowerCase(),
        'moving_averages': fifteenData.moving_averages.toLowerCase(),
        'technical_indicators': fifteenData.technical_indicators.toLowerCase(),
        'value': fifteenData.value
      });
    }
  });

})


.controller('usfutureController', function ($scope, $state, socket) {

  $scope.usfutureData = function (page) {
      socket.emit('get usfuture data', {'page': page});
  };

  socket.on('usfuture data', function(data){
    if($state.current.name === 'usfuture.usfutureperiod60'){
      $scope.usfuture_1s = data.usfuture;
    }else if($state.current.name === 'usfuture.usfutureperiod300'){
      $scope.usfuture_5s = data.usfuture;
    }else if($state.current.name === 'usfuture.usfutureperiod900'){
      $scope.usfuture_15s = data.usfuture;
    }
  });

  socket.on('one minute usfuture-report', function(oneData){
    if($state.current.name === 'usfuture.usfutureperiod60'){
      $scope.usfuture_1s.push({
        'created_on': oneData.created_on,
        'summary': oneData.summary.toLowerCase(),
        'moving_averages': oneData.moving_averages.toLowerCase(),
        'technical_indicators': oneData.technical_indicators.toLowerCase(),
        'value': oneData.value
      });
    }
  });

  socket.on('five minute usfuture-report', function(fiveData){
    if($state.current.name === 'usfuture.usfutureperiod300'){
      $scope.usfuture_5s.push({
        'created_on': fiveData.created_on,
        'summary': fiveData.summary.toLowerCase(),
        'moving_averages': fiveData.moving_averages.toLowerCase(),
        'technical_indicators': fiveData.technical_indicators.toLowerCase(),
        'value': fiveData.value
      });
    }
  });

  socket.on('fifteen minute usfuture-report', function(fifteenData){
    if($state.current.name === 'usfuture.usfutureperiod900'){
      $scope.usfuture_15s.push({
        'created_on': fifteenData.created_on,
        'summary': fifteenData.summary.toLowerCase(),
        'moving_averages': fifteenData.moving_averages.toLowerCase(),
        'technical_indicators': fifteenData.technical_indicators.toLowerCase(),
        'value': fifteenData.value
      });
    }
  });

})

.controller('sengController', function ($scope, $state, socket) {

  $scope.sengData = function (page) {
      socket.emit('get seng data', {'page': page});
  };

  socket.on('seng data', function(data){
    if($state.current.name === 'seng.sengperiod60'){
      $scope.seng_1s = data.seng;
    }else if($state.current.name === 'seng.sengperiod300'){
      $scope.seng_5s = data.seng;
    }else if($state.current.name === 'seng.sengperiod900'){
      $scope.seng_15s = data.seng;
    }
  });

  socket.on('one minute seng-report', function(oneData){
    if($state.current.name === 'seng.sengperiod60'){
      $scope.seng_1s.push({
        'created_on': oneData.created_on,
        'summary': oneData.summary.toLowerCase(),
        'moving_averages': oneData.moving_averages.toLowerCase(),
        'technical_indicators': oneData.technical_indicators.toLowerCase(),
        'value': oneData.value
      });
    }
  });

  socket.on('five minute seng-report', function(fiveData){
    if($state.current.name === 'seng.sengperiod300'){
      $scope.seng_5s.push({
        'created_on': fiveData.created_on,
        'summary': fiveData.summary.toLowerCase(),
        'moving_averages': fiveData.moving_averages.toLowerCase(),
        'technical_indicators': fiveData.technical_indicators.toLowerCase(),
        'value': fiveData.value
      });
    }
  });

  socket.on('fifteen minute seng-report', function(fifteenData){
    if($state.current.name === 'seng.sengperiod900'){
      $scope.seng_15s.push({
        'created_on': fifteenData.created_on,
        'summary': fifteenData.summary.toLowerCase(),
        'moving_averages': fifteenData.moving_averages.toLowerCase(),
        'technical_indicators': fifteenData.technical_indicators.toLowerCase(),
        'value': fifteenData.value
      });
    }
  });

});
