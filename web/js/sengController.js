angular.module('tradespider')

.controller('sengController', function ($scope, $state, $http, socket) {

  function strengthAccuracy(data) {
    var correctStrength = 0, changeCount = 0;
    async.each(data, function (item, callback) {
      if(item.signal_strength === 'correct') correctStrength++;
      if(item.signal_strength === 'change') changeCount++;
      callback();
    }, function (err) {
      if (err) {
        console.log('Error While Calculating Accuracy.');
      }else {
        if($state.current.name === 'seng.sengperiod60'){
          $scope.seng_1_average = ( correctStrength/ ( data.length - changeCount ) ) * 100;
        }else if($state.current.name === 'seng.sengperiod300'){
          $scope.seng_5_average = ( correctStrength/ ( data.length - changeCount ) ) * 100;
        }else if($state.current.name === 'seng.sengperiod900'){
          $scope.seng_15_average = ( correctStrength/ ( data.length - changeCount ) ) * 100;
        }
      }
    });
  }

  $scope.sengData = function (page) {
    $http.post( socketUrl + '/seng/get_seng_data', {'page': page}).success(function (res, req) {
      if(res.status === 0){
        console.log('Error While Executing the query for: '+ $state.current.name);
      }else {
        if($state.current.name === 'seng.sengperiod60'){
          $scope.seng_1s = res;
        }else if($state.current.name === 'seng.sengperiod300'){
          $scope.seng_5s = res;
        }else if($state.current.name === 'seng.sengperiod900'){
          $scope.seng_15s = res;
        }
        strengthAccuracy(res);
      }
    }).error(function (err) {
      console.log('Internet Connection Is Not Available.');
    });
  };

  // $scope.deleteSengRecords = function () {
  //   socket.emit('clear seng records');
  // };

  socket.on('one minute seng-report', function(oneData){
    if($state.current.name === 'seng.sengperiod60'){
      $scope.seng_1s.push({
        'created_on': oneData.created_on,
        'summary': oneData.summary.toLowerCase(),
        'moving_averages': oneData.moving_averages.toLowerCase(),
        'technical_indicators': oneData.technical_indicators.toLowerCase(),
        'value': oneData.value,
        'change_type': oneData.change_type,
        'change_flag': oneData.change_flag,
        'signal_strength': oneData.signal_strength
      });
      strengthAccuracy($scope.seng_1s);
    }
  });

  socket.on('five minute seng-report', function(fiveData){
    if($state.current.name === 'seng.sengperiod300'){
      $scope.seng_5s.push({
        'created_on': fiveData.created_on,
        'summary': fiveData.summary.toLowerCase(),
        'moving_averages': fiveData.moving_averages.toLowerCase(),
        'technical_indicators': fiveData.technical_indicators.toLowerCase(),
        'value': fiveData.value,
        'change_type': fiveData.change_type,
        'change_flag': fiveData.change_flag,
        'signal_strength': fiveData.signal_strength
      });
      strengthAccuracy($scope.seng_5s);
    }
  });

  socket.on('fifteen minute seng-report', function(fifteenData){
    if($state.current.name === 'seng.sengperiod900'){
      $scope.seng_15s.push({
        'created_on': fifteenData.created_on,
        'summary': fifteenData.summary.toLowerCase(),
        'moving_averages': fifteenData.moving_averages.toLowerCase(),
        'technical_indicators': fifteenData.technical_indicators.toLowerCase(),
        'value': fifteenData.value,
        'change_type': fifteenData.change_type,
        'change_flag': fifteenData.change_flag,
        'signal_strength': fifteenData.signal_strength
      });
      strengthAccuracy($scope.seng_15s);
    }
  });

});
