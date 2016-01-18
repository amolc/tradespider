angular.module('tradespider')

.controller('daxController', function ($scope, $state, socket) {

  $scope.daxData = function (page) {
    socket.emit('get dax data', {'page': page});
  };

  $scope.deleteDaxRecords = function () {
    socket.emit('clear dax records');
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
    console.log(oneData);
    if($state.current.name === 'dax.daxperiod60'){
      $scope.dax_1s.push({
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

  socket.on('five minute dax-report', function(fiveData){
    if($state.current.name === 'dax.daxperiod300'){
      $scope.dax_5s.push({
        'created_on': fiveData.created_on,
        'summary': fiveData.summary,
        'moving_averages': fiveData.moving_averages,
        'technical_indicators': fiveData.technical_indicators,
        'value': fiveData.value
      });
    }
  });

  socket.on('fifteen minute dax-report', function(fifteenData){
    if($state.current.name === 'dax.daxperiod900'){
      $scope.dax_15s.push({
        'created_on': fifteenData.created_on,
        'summary': fifteenData.summary,
        'moving_averages': fifteenData.moving_averages,
        'technical_indicators': fifteenData.technical_indicators,
        'value': fifteenData.value
      });
    }
  });

});
