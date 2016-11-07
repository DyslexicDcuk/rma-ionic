app

.controller('AppCtrl', function($scope, DataFactory, $ionicHistory, $state) {
  $scope.logout = () => {
    DataFactory.logout();
    $ionicHistory.nextViewOptions({
      disableBack: true
    });

    $state.go('app.login', {}, {location: 'replace'});
  }
})
