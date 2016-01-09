angular.module('tradespider',['ui.router','btford.socket-io'])
.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('60', {
    url: "/60",
    templateUrl: "templates/period_60.html",
    controller: 'daxController',
  })

  .state('300', {
    url: "/300",
    templateUrl: "templates/period_300.html",
    controller: 'daxController'
  });

  $urlRouterProvider.otherwise('/60');

})
// SOCKET Config for the DEVELOPMENT instance
.factory('socket', function(socketFactory){
  console.log(socketUrl);
    var myIoSocket = io.connect(socketUrl);
  	mySocket = socketFactory({
    	ioSocket: myIoSocket
  	});
    return mySocket;
})
.controller('daxController', function ($scope, socket) {
  console.log('controller');
  socket.on('connect', function(){
    socket.emit('add user', {'new': 'User'});
  });

  socket.on('dax data', function(data){
    $scope.dax_1s = data.dax_1;
    $scope.dax_5s = data.dax_5;
  });

  socket.on('one minute report', function(oneData){
    $scope.dax_1s.push({
      'created_on': oneData.created_on,
      'summary': oneData.summary.toLowerCase(),
      'moving_averages': oneData.moving_averages.toLowerCase(),
      'technical_indicators': oneData.technical_indicators.toLowerCase()
    });
  });

  socket.on('five minute report', function(fiveData){
    $scope.dax_5s.push({
      'created_on': fiveData.created_on,
      'summary': fiveData.summary.toLowerCase(),
      'moving_averages': fiveData.moving_averages.toLowerCase(),
      'technical_indicators': fiveData.technical_indicators.toLowerCase()
    });
  });

});
