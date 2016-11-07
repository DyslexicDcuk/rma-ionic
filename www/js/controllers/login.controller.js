app

.controller('LoginCtrl', function($scope, $rootScope, $state, DataFactory, $ionicHistory) {
  $scope.$on("$ionicView.beforeEnter", function(event, data){
    // handle event
    $scope.loginData = {};

    $rootScope.currentUser = DataFactory.getCurrentUser();

    if ($rootScope.currentUser) {
      $ionicHistory.nextViewOptions({ disableBack: true });

      $state.go('app.map', {}, {location: 'replace'});
    }
  });

  $scope.doLogin = (credentials) => {
    $rootScope.currentUser = DataFactory.login(credentials);

    if ($rootScope.currentUser) {
      $ionicHistory.nextViewOptions({ disableBack: true });
      $state.go('app.map', {}, {location: 'replace'});
    }
  }
})