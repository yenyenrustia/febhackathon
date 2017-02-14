angular.module('map.controllers', [])

.controller('MapCtrl', function(
 $scope,
 $ionicLoading,
 $state,
 $ionicSideMenuDelegate,
 $cordovaGeolocation,
 $http,
 $ionicPopup,
 $ionicSlideBoxDelegate,
 localStorageService,
 ServiceMap) {
  

  $scope.map = {center: {latitude: 40.74965, longitude: -73.98479 }, zoom: 16 };
  $scope.options = {scrollwheel: true};
  $scope.markers = [];
  $scope.activeSlide = 0;
  // $ionicLoading.show({});
   var userProfile = localStorageService.get('USER_MAIN');
  // ServiceMap.getCapsule().then(function(result){
  //   console.log(result);
  //   var data = result.data;
  //   for(var i=0; i<data.length; i++) {
  //           //inside for
  //             $scope.markers.push({
  //                 id: i,
  //                 cid: data[i].cid,
  //                   loc:{
  //                   latitude: data[i].loc.lat,
  //                   longitude: data[i].loc.lon,
  //                   options: {scrollwheel: false},
  //                 },
  //                 smallAvatarUrl:data[i].smallAvatarUrl,
  //                 data:data[i]
  //             });
  //             //end for
  //         }
  
  //      $ionicSlideBoxDelegate.update();
  // });

  // get position of user and then set the center of the map to that position
  $scope.centerOnMe = function(){
    var load = $ionicLoading.show({});
     $cordovaGeolocation
    .getCurrentPosition()
    .then(function (position) {
      $ionicLoading.hide();
       $scope.circles = [
            {
                id: 1,
                center: {
                    latitude: position.coords.latitude,
                    longitude:position.coords.longitude
                },
                radius: 400,
                stroke: {
                    color: '#08B21F',
                    weight: 1,
                    opacity: 1
                },
                fill: {
                    color: '#FFFFFF',
                    opacity: .01
                },
                geodesic: true, // optional: defaults to false
                draggable: false, // optional: defaults to false
                clickable: false, // optional: defaults to true
                editable: false, // optional: defaults to false
                visible: true, // optional: defaults to true
                control: {}
            },
             {
                id: 2,
                center: {
                    latitude: position.coords.latitude,
                    longitude:position.coords.longitude
                },
                radius: 10,
                stroke: {
                    color: '#08B21F',
                    weight: 1,
                    opacity: 1
                },
                fill: {
                    color: '#FF0000',
                    opacity: 1
                },
                geodesic: true, // optional: defaults to false
                draggable: false, // optional: defaults to false
                clickable: false, // optional: defaults to true
                editable: false, // optional: defaults to false
                visible: true, // optional: defaults to true
                control: {}
            },
            {
                id: 3,
                center: {
                    latitude: position.coords.latitude,
                    longitude:position.coords.longitude
                },
                radius: 200,
                stroke: {
                    color: '#67fcd2',
                    weight: 1,
                    opacity: 1
                },
                fill: {
                    color: '#08B21F',
                    opacity: .01
                },
                geodesic: true, // optional: defaults to false
                draggable: false, // optional: defaults to false
                clickable: false, // optional: defaults to true
                editable: false, // optional: defaults to false
                visible: true, // optional: defaults to true
                control: {}
            }
      ];


      var lat  = position.coords.latitude
      var long = position.coords.longitude
      $scope.map = {center: {latitude: lat, longitude: long}, zoom: 16 };
      // //just want to create this loop to make more markers
     
        $ionicLoading.hide();
    }, function(err) {
      // error
      $ionicLoading.hide();
    });
  }
  //Show Capsule details
   $scope.showCapsule = function(data,id){
    console.log(id);
    $scope.activeSlide = id;
}
  $scope.SlidePreview = function(data){
     localStorageService.set('capsuleDataPreview',data);
          $state.go('app.home.capsule',{'capsuleData':data.cid}, {reload: true});
  }

//   // circle marker
   
});
