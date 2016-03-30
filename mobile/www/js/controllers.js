angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $state, $ionicModal, $timeout, store, AuthService, $ionicSideMenuDelegate) {

  $scope.init = function(){
    $scope.islogin = store.get('user_login');
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

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'DAX', id: 1 },
    { title: 'DOW', id: 2 },
    { title: 'US FEATURES', id: 3 },
    { title: 'HSE', id: 4 },
    { title: 'BIST 100', id: 4 },
    { title: 'CHINA A50', id: 4 },
    { title: 'HANG SENG', id: 4 },
    { title: 'NIFTY 50', id: 4 },
    { title: 'NASDAQ', id: 4 },
    { title: 'CAC 40', id: 4 },
  ];
 
    $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.series = ['Series A', 'Series B'];
    $scope.data = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
    ];
 
});