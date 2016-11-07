app

.controller('LocationsCtrl', function($scope, $rootScope, $state, DataFactory, $ionicHistory) {
  $scope.$on("$ionicView.beforeEnter", function(event, data){
    $scope.locations = {};
    $scope.locations = DataFactory.getLocations(DataFactory.getCurrentUser());
  });
})

.controller('LocationCtrl', function($scope, $rootScope, $state, DataFactory, $ionicHistory, $stateParams) {
  $scope.$on("$ionicView.beforeEnter", function(event, data){
    $scope.loc = DataFactory.getLocationById($stateParams.locationId);
  });

  $scope.saveLocation = (loc) => {
    DataFactory.saveLocation(loc);

    $ionicHistory.nextViewOptions({ disableBack: true });
    $state.go('app.locations', {}, {location: 'replace'});
  }
})