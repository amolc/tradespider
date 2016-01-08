angular.module('tradespider',['btford.socket-io'])
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
    $scope.dax_1 = data.dax_1[0];
    $scope.dax_5 = data.dax_5[0];
  });

});
