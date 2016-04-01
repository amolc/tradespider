angular.module('starter.controllers')

.controller('logincontroller', function($scope, $state, $http, store, AuthService, $timeout, $ionicSideMenuDelegate, $rootScope, $cordovaOauth, $ionicHistory) {

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
  		loginData.platform = store.get('platform');
		loginData.device = store.get('deviceid');
		loginData.token_id = window.localStorage.getItem("token_id");
  		console.log(loginData);
		$http.post( socketUrl + '/user/login', loginData).success(function (res, req) {
			console.log(res);
			if(res.status == 1){
				var user = res.userdata[0];
				AuthService.isAuthenticated = true;
				store.set('user_login', true);
				store.set('user_id',user._id);
				store.set('user_email', user.user_email);
				store.set('first_name', user.first_name);
				store.set('last_name', user.last_name);
				$scope.init();
				$timeout(function() {
					$ionicHistory.clearCache().then(function() {
						$state.go('app.playlists');
					});
				}, 2000);
			}
		}).error(function (err) {
			console.log('Internet Connection Is Not Available.');
		});
  	}

	$scope.facebookLogin = function() {
		$cordovaOauth.facebook("227183420967954", ["email"]).then(function(result) {
			if( result.access_token ) {
				$http.get("https://graph.facebook.com/v2.2/me", {
					params: {
						access_token: result.access_token,
						fields: "id,name,email,gender,first_name,last_name,location,website,picture,relationship_status",
						format: "json"
					}
				}).then(function(result) {
					var loginData = {
						facebook : result.data,
						platform : store.get('platform'),
						device : store.get('deviceid'),
						token_id : window.localStorage.getItem("token_id")
					}
					$http.post( socketUrl + '/user/facebookLogin', loginData).success(function (res, req) {
						console.log(res);
						var user = res.userdata;
						if(res.status == 1){
							AuthService.isAuthenticated = true;
							store.set('user_login', true);
							store.set('user_id',user._id);
							store.set('user_email', user.user_email);
							store.set('first_name', user.first_name);
							store.set('last_name', user.last_name);
							$scope.init();
							$timeout(function() {
								$ionicHistory.clearCache().then(function() {
									$state.go('app.playlists');
								});
							}, 2000);
						}
					}).error(function (err) {
						console.log('Internet Connection Is Not Available.');
					});
				}, function(error) {
					console.log("There was a problem getting your profile.  Check the logs for details.");
				});
			}
		},function(error) {
		console.log(error);
		});
	};


			/**
		 * [Google Login]
		 * @return {[type]} [description]
		 */

		$scope.googlelogin = function(){
			$cordovaOauth.google("593949264491-spkoftetj1fc78lkpgdj8s4kca52rumo.apps.googleusercontent.com", ["https://www.googleapis.com/auth/userinfo.profile", "email"]).then(function(result) {
		      	$http.get("https://www.googleapis.com/oauth2/v1/userinfo", { params: { access_token: result.access_token, format: "json" }}).then(function(response) {
		        	var data = {
		          		google : response.data
		        	};
		        	var loginData = {
						google : response.data,
						platform : store.get('platform'),
						device : store.get('deviceid'),
						token_id : window.localStorage.getItem("token_id")
					}
					$http.post( socketUrl + '/user/googleLogin', loginData).success(function (res, req) {
						console.log(res);
						var user = res.userdata;
						if(res.status == 1){
							AuthService.isAuthenticated = true;
							store.set('user_login', true);
							store.set('user_id',user._id);
							store.set('user_email', user.user_email);
							store.set('first_name', user.first_name);
							store.set('last_name', user.last_name);
							$scope.init();
							$timeout(function() {
								$ionicHistory.clearCache().then(function() {
									$state.go('app.playlists');
								});
							}, 2000);
						}
					}).error(function (err) {
						console.log('Internet Connection Is Not Available.');
					});
		      	});
		    }, function(error) {
		        console.log(error);
		    });

		};


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
