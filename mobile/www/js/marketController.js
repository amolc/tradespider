angular.module('starter.controllers')

.controller('marketController', function($scope, $state, $http, $stateParams, store, socket) {

  $scope.getMarket = function (page) {
    $http.post( socketUrl + '/market/getMarket', $stateParams).success(function (res, req) {
      if(res.status === 0){
        console.log('Error While Executing the query for: '+ $state.current.name);
      }else {
        console.log(res);
        $scope.marketData = res;
      }
    }).error(function (err) {
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
    $http.post( socketUrl + '/usfuture/subscribe', data).success(function (res, req) {
      console.log(res);
      if(res.status == 1){
        $scope.message = res.message;
      }else{
        $scope.err_message = res.message;
      }
    }).error(function (err) {
      console.log('Internet Connection Is Not Available.');
    });
  }
})