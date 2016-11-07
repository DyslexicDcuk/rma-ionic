app

.controller('RegistrationCtrl', function($scope, $state, DataFactory, $ionicHistory) {
  $scope.register = (user) => {
    DataFactory.registerUser(user);

    $ionicHistory.nextViewOptions({
      disableBack: true
    });

    $state.go('app.login', {}, {location: 'replace'});
  }

  $scope.$on("$ionicView.beforeEnter", function(event, data){
    $scope.userData = {};
  });
})