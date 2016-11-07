app

.controller('MapCtrl', function($scope, $state, $cordovaGeolocation, $ionicModal, DataFactory) {
  var options = {timeout: 10000, enableHighAccuracy: true};

  $cordovaGeolocation.getCurrentPosition(options).then((position) => {
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.TOP_LEFT
      },
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_TOP
      },
      scaleControl: false,
      streetViewControl: false,
    };

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    google.maps.event.addListenerOnce($scope.map, 'idle', function(){
      const locations = DataFactory.getLocations(DataFactory.getCurrentUser());

      locations.forEach((item) => {
        const marker = new google.maps.Marker({
          map: $scope.map,
          animation: google.maps.Animation.DROP,
          position: item.latLng
        });

        const infoWindow = new google.maps.InfoWindow({
          content: item.title
        });

        google.maps.event.addListener(marker, 'click', function () {
          infoWindow.open($scope.map, marker);
        });
      });
    });
  }, function(error){
    console.log("Could not get location");
  });

  $scope.addLocation = (newLocation) => {
    newLocation.latLng = $scope.map.getCenter();
    newLocation.createdBy = DataFactory.getCurrentUser().id;
    newLocation.owners = [newLocation.createdBy];
    DataFactory.addLocation(newLocation);
  }

  $scope.cancel = () => {
    $scope.newLocation = {};
    $scope.modal.hide();
  }

  $ionicModal.fromTemplateUrl('templates/add-location.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then((modal) => { $scope.modal = modal; });
  $scope.openModal = () => { $scope.modal.show(); };
  $scope.closeModal = function() {
    $scope.newLocation = {};
    $scope.modal.hide();
  };
  $scope.$on('$destroy', () => { $scope.modal.remove(); });
});