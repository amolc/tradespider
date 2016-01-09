angular.module('tradespider',['ui.router','btford.socket-io'])
.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('dax', {
    url: "/dax",
    templateUrl: "templates/dax.html",
    controller: 'daxController'
  })

  .state('dax.daxperiod60', {
    url: "/daxperiod60",
    templateUrl: "templates/daxperiod60.html",
  })

  .state('dax.daxperiod300', {
    url: "/daxperiod300",
    templateUrl: "templates/daxperiod300.html",
  })

  .state('dax.daxperiod1500', {
    url: "/daxperiod1500",
    templateUrl: "templates/daxperiod1500.html",
  })

  .state('dow', {
    url: "/dow",
    templateUrl: "templates/dow.html",
    controller: 'dowController'
  })

  .state('dow.dowperiod60', {
    url: "/dowperiod60",
    templateUrl: "templates/dowperiod60.html",
  })

  .state('dow.dowperiod300', {
    url: "/dowperiod300",
    templateUrl: "templates/dowperiod300.html",
  })

  .state('dow.dowperiod1500', {
    url: "/dowperiod1500",
    templateUrl: "templates/dowperiod1500.html",
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
    }else if($state.current.name === 'dax.daxperiod1500'){
      $scope.dax_15s = data.dax;
    }
  });

  socket.on('one minute dax report', function(oneData){
    console.log(oneData);
    $scope.daxs.push({
      'created_on': oneData.created_on,
      'summary': oneData.summary.toLowerCase(),
      'moving_averages': oneData.moving_averages.toLowerCase(),
      'technical_indicators': oneData.technical_indicators.toLowerCase()
    });
  });

  socket.on('five minute dax report', function(fiveData){
    console.log(fiveData);
    $scope.daxs.push({
      'created_on': fiveData.created_on,
      'summary': fiveData.summary.toLowerCase(),
      'moving_averages': fiveData.moving_averages.toLowerCase(),
      'technical_indicators': fiveData.technical_indicators.toLowerCase()
    });
  });

  socket.on('fifteen minute dax report', function(fifteenData){
    console.log(fifteenData);
    $scope.daxs.push({
      'created_on': fifteenData.created_on,
      'summary': fifteenData.summary.toLowerCase(),
      'moving_averages': fifteenData.moving_averages.toLowerCase(),
      'technical_indicators': fifteenData.technical_indicators.toLowerCase()
    });
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
    }else if($state.current.name === 'dow.dowperiod1500'){
      $scope.dow_15s = data.dow;
    }
  });

  socket.on('one minute dow report', function(oneData){
    $scope.dow_1s.push({
      'created_on': oneData.created_on,
      'summary': oneData.summary.toLowerCase(),
      'moving_averages': oneData.moving_averages.toLowerCase(),
      'technical_indicators': oneData.technical_indicators.toLowerCase()
    });
  });

  socket.on('five minute dow report', function(fiveData){
    $scope.dow_5s.push({
      'created_on': fiveData.created_on,
      'summary': fiveData.summary.toLowerCase(),
      'moving_averages': fiveData.moving_averages.toLowerCase(),
      'technical_indicators': fiveData.technical_indicators.toLowerCase()
    });
  });

  socket.on('fifteen minute dow report', function(fifteenData){
    $scope.dow_15s.push({
      'created_on': fifteenData.created_on,
      'summary': fifteenData.summary.toLowerCase(),
      'moving_averages': fifteenData.moving_averages.toLowerCase(),
      'technical_indicators': fifteenData.technical_indicators.toLowerCase()
    });
  });

});
