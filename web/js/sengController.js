angular.module('tradespider')

.controller('sengController', function ($scope, $state, socket) {

  $scope.sengData = function (page) {
      socket.emit('get seng data', {'page': page});
  };

  $scope.deleteSengRecords = function () {
    socket.emit('clear seng records');
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
        'value': oneData.value,
        'change_type': oneData.change_type,
        'change_flag': oneData.change_flag
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
