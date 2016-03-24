angular.module('starter.controllers')

.controller('logincontroller', function($scope, $state, $http, store) {
	
	$scope.saveToken = function (page) {

		var devicedetails = {
			platform : store.get('platform'),
			device : store.get('deviceid'),
			token_id : window.localStorage.getItem("token_id")
		}

	    $http.post( socketUrl + '/notification/addDevice', {'page': devicedetails}).success(function (res, req) {
	      console.log(res);
	    }).error(function (err) {
	      console.log('Internet Connection Is Not Available.');
	    });
  	};
  	$scope.saveToken();

})
