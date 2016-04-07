angular.module('starter.controllers', [])

.controller('marketsController', function($scope) {
  $scope.marketlist_Data = [
    { title: 'DAX', id: 1, key:"dax" },
    { title: 'Dow 30', id: 2, key:"dow" },
    { title: 'S&P 500', id: 3, key:"s&p500"  },
    { title: 'Nasdaq', id: 4, key:"nasdaq"  },
    { title: 'BIST 100', id: 5, key:"dax" },
    { title: 'CHINA A50', id: 6, key:"dax" },
    { title: 'HANG SENG', id: 7 , key:"dax" },
    { title: 'NIFTY 50', id: 8, key:"dax" },
    { title: 'NASDAQ', id: 9, key:"dax" },
    { title: 'CAC 40', id: 10, key:"dax" },
  ];
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
