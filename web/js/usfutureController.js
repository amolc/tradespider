angular.module('tradespider')

.controller('usfutureController', function ($scope, $state, socket) {

  $scope.usfutureData = function (page) {
      socket.emit('get usfuture data', {'page': page});
  };

  $scope.deleteUsFutureRecords = function () {
    socket.emit('clear usfuture records');
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
        'summary': oneData.summary,
        'moving_averages': oneData.moving_averages,
        'technical_indicators': oneData.technical_indicators,
        'value': oneData.value,
        'change_type': oneData.change_type,
        'change_flag': oneData.change_flag
      });
    }
  });

  socket.on('five minute usfuture-report', function(fiveData){
    if($state.current.name === 'usfuture.usfutureperiod300'){
      $scope.usfuture_5s.push({
        'created_on': fiveData.created_on,
        'summary': fiveData.summary,
        'moving_averages': fiveData.moving_averages,
        'technical_indicators': fiveData.technical_indicators,
        'value': fiveData.value
      });
    }
  });

  socket.on('fifteen minute usfuture-report', function(fifteenData){
    if($state.current.name === 'usfuture.usfutureperiod900'){
      $scope.usfuture_15s.push({
        'created_on': fifteenData.created_on,
        'summary': fifteenData.summary,
        'moving_averages': fifteenData.moving_averages,
        'technical_indicators': fifteenData.technical_indicators,
        'value': fifteenData.value
      });
    }
  });

});
