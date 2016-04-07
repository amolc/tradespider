angular.module('starter.controllers')
.controller('profileController', function($scope, store) {

  $scope.init = function(){
    $scope.userdata = store.get('userdata');
    console.log($scope.userdata);
  }

});
