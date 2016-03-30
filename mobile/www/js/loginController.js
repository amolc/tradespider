angular.module('starter.controllers')

.controller('logincontroller', function($scope, $state, $http, store, AuthService, $timeout, $ionicSideMenuDelegate, $rootScope) {

	$scope.init = function(){
		$rootScope.islogin = store.get('user_login') || false;
		console.log($scope.islogin);
	}

	$scope.saveToken = function (page) {

		var devicedetails = {
			platform : store.get('platform'),
			device : store.get('deviceid'),
			token_id : window.localStorage.getItem("token_id")
		}

	    $http.post( socketUrl + '/user/addDevice', devicedetails).success(function (res, req) {
	      console.log(res);
	    }).error(function (err) {
	      console.log('Internet Connection Is Not Available.');
	    });
  	};
  	// $scope.saveToken();

  	$scope.register = function (userData) {
		
		$http.post( socketUrl + '/user/register', userData).success(function (res, req) {
			console.log(res);
			if(res.status == 1){
				$state.go('app.login');
			}else{
				$scope.errmsg = res.message;
			}
		}).error(function (err) {
			console.log('Internet Connection Is Not Available.');
		});
  	}

  	$scope.login = function (loginData) {
  		loginData.platform = store.get('platform'),
		loginData.device = store.get('deviceid'),
		loginData.token_id = window.localStorage.getItem("token_id")
  		console.log(loginData);
		$http.post( socketUrl + '/user/login', loginData).success(function (res, req) {
			console.log(res);
			var user = res.userdata[0];
			if(res.status == 1){
				AuthService.isAuthenticated = true;
				store.set('user_login', true);
				store.set('user_id',user._id);
				store.set('user_email', user.user_email);
				store.set('first_name', user.first_name);
				store.set('last_name', user.last_name);
				$scope.init();
				$timeout(function() {
					$state.go('app.playlists');
				}, 2000);
			}
		}).error(function (err) {
			console.log('Internet Connection Is Not Available.');
		});
  	}



  $scope.logout = function(){
    AuthService.isAuthenticated = false;
    store.remove('user_login');
    store.remove('user_id');
    store.remove('user_email');
    store.remove('first_name');
    store.remove('last_name');
    $scope.init();
    $ionicSideMenuDelegate.toggleLeft();
    $state.go('app.playlists');
  }
})
