angular.module('tradespiderAdmin')
.controller('marketsController', function ($scope, $state, $http) {

	$scope.getData =function(market){
		var data = {
			market : market
		}
		$http.post( socketUrl + '/markets/getMarket', data).success(function (res, req) {
			console.log(res);
			$scope.marketData = res;
		}).error(function (err) {
			console.log('Internet Connection Is Not Available.');
		});
	}

})