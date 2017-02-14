angular.module('ourcapsule.controllers', [])
.controller('OurCapsuleCtrl', function(
  $rootScope,
  $scope,
  $ionicModal,
  $timeout,
  $state,
  $http,
  $ionicLoading,
  localStorageService) {
  
      
})
.controller('OurCapsuleTabCtrl', function(
  $rootScope,
  $scope,
  $ionicModal,
  $timeout,
  $state,
  $http,
  $ionicLoading,
  localStorageService,
  ServiceOurCapsule,
  $stateParams) {

   var cid = $stateParams.id;
   var userProfile = localStorageService.get('userProfile');
   $scope.capsule = localStorageService.get('capsuleDataPreview');

   ServiceOurCapsule.getOurCapsule(cid).then(function(result){
      $scope.capsulelist = result.data;
    });

   $scope.viewItem = function(data){
      $state.go('app.ourcapsule.item',{id:data});
    }

})
.controller('OurCapsuleListCtrl', function(
  $rootScope,
  $scope,
  $ionicModal,
  $timeout,
  $state,
  $http,
  $ionicLoading,
  localStorageService,
  ServiceOurCapsule) {
        
        ServiceOurCapsule.getOurCapsuleList().then(function(result){
           $scope.capsuleListdata = result.data;
        });
        $scope.previewCapsule = function(data){
          console.log(data);
             localStorageService.set('capsuleDataPreview',data);
          $state.go('app.ourcapsule.tab',{id:data.cid})
        };
}).controller('OurCapsuleItemCtrl', function(
  $rootScope,
  $scope,
  $ionicModal,
  $timeout,
  $state,
  $http,
  $ionicLoading,
  localStorageService,
  $stateParams) {
  
   $scope.capsulelist  = localStorageService.get('item');
    $scope.itemData = $stateParams.id -1;
   console.log($scope.item);
 
});