angular.module('starter.controllers')

.controller('marketController', function($scope, $state, $http, $stateParams, store, $ionicLoading, socket) {

  $scope.marketlist_Data = [
    { title: 'DAX', id: 1, key:"dax" },
    { title: 'DOW', id: 2, key:"dax" },
    { title: 'US FEATURES', id: 3, key:"usfeature"  },
    { title: 'HSE', id: 4, key:"dax"  },
    { title: 'BIST 100', id: 4, key:"dax" },
    { title: 'CHINA A50', id: 4, key:"dax" },
    { title: 'HANG SENG', id: 4 , key:"dax" },
    { title: 'NIFTY 50', id: 4, key:"dax" },
    { title: 'NASDAQ', id: 4, key:"dax" },
    { title: 'CAC 40', id: 4, key:"dax" },
  ];

  function strengthAccuracy(data) {
    var correctStrength = 0, changeCount = 0;
    async.each(data, function (item, callback) {
     console.log(item);
      if(item.signal_strength === 'correct') correctStrength++;
      if(item.signal_strength === 'change') changeCount++;
      callback();
    }, function (err) {
      if (err) {
        console.log('Error While Calculating Accuracy.');
      }else {
          $scope.average = ( correctStrength/ ( data.length - changeCount ) ) * 100;       
          console.log($scope.average);
      }
    });
  }

  $scope.getMarket = function (page) {
    $ionicLoading.show();
    $http.post( socketUrl + '/market/getMarket', $stateParams).success(function (res, req) {
      if(res.status === 0){
        $ionicLoading.hide();
        console.log('Error While Executing the query for: '+ $state.current.name);
      }else {
        $ionicLoading.hide();
        $scope.marketData = res;
        console.log($scope.marketData);
        // strengthAccuracy($scope.marketData);
      }
    }).error(function (err) {
      $ionicLoading.hide();
      console.log('Internet Connection Is Not Available.');
    });
  };

  $scope.subscribe = function(strtNotify, period){
    if(parseInt($stateParams.marketlistId) == 1){
      var market = "usFuture";
    }else{
      var market = "usFuture";
    }
    var data = {
      period : period,
      email  : store.get('user_email'),
      userId : store.get('user_id'),
      type   : store.get('platform'),
      market : market,
      token  : window.localStorage.getItem("token_id"),
      name   : store.get('first_name')+' '+store.get('last_name'),
      status : strtNotify
    }
    console.log(data);
    $http.post( socketUrl + '/market/subscribe', data).success(function (res, req) {
      if(res.status == 1){
        console.log(res);
        for (var i = 0; i < $scope.marketlist_Data.length; i++) {
          if( parseInt($stateParams.marketlistId) == $scope.marketlist_Data[i].id){
            console.log($scope.marketlist_Data[i]);
          }
        };
        $scope.message = res.message;
      }else{
        $scope.err_message = res.message;
      }
    }).error(function (err) {
      console.log('Internet Connection Is Not Available.');
    });
  }
})