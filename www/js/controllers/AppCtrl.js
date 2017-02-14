angular.module('app.controllers', [])
.controller('AppCtrl', function(
  $rootScope,
  $scope,
  $ionicModal,
  $timeout,
  $state,
  localStorageService,
  ServiceApp) {
  //user profile in menu
     $scope.user = ServiceApp.user_mainGet();
     $scope.doLogout = function(){
     ServiceApp.user_mainRemove();
      $state.go('login');
     }
     
})
.controller('HomeCtrl', function(
  $rootScope,
  $scope,
  $ionicModal,
  $timeout,
  $state) {

})
.controller('MapViewCtrl', function(
  $rootScope,
  $scope,
  $ionicModal,
  $timeout,
  $state) {

})
.controller('CardViewCtrl', function(
  $rootScope,
  $scope,
  $ionicModal,
  $timeout,
  $state) {

})
.controller('ListViewCtrl', function(
  $rootScope,
  $scope,
  $ionicModal,
  $timeout,
  $state,
  $ionicLoading,
   $http,
   ServiceList,
   localStorageService) {
   // $ionicLoading.show({});
   // ServiceList.getList().then(function(result){
   //   $scope.capsuleListdata = result.data;
   // });

   $scope.viewItem = function(data){
         localStorageService.set('capsuleDataPreview',data);
         console.log(data);
          $state.go('app.home.capsuleList',{'capsuleData':data.cid}, {reload: true});
   };
})
.controller('ItemCtrl', function(
  $rootScope,
  $scope,
  $ionicModal,
  $timeout,
  $state,
  $stateParams) {

console.log($stateParams);
})
.controller('RegisterCtrl', function(
  $rootScope,
  $scope,
  $ionicModal,
  $timeout,
  $state,
  $stateParams) {

console.log($stateParams);
})
.controller('CapsuleCtrl', function(
  $rootScope,
  $scope,
  $ionicModal,
  $timeout,
  $state,
  $stateParams,
  localStorageService,
  $http,
  $ionicLoading,
  $ionicSlideBoxDelegate,
  ServiceCapsule) {


   $ionicModal.fromTemplateUrl('templates/modals/item.html', {
    animation: 'slide-left-right',
    scope: $scope
  }).then(function(modal) {
    $scope.itemView = modal;
  });



  //item view
    $scope.viewItem = function(data){
      $state.go('app.home.item',{itemData:data});
    };
    $scope.closeItem = function(){
      $scope.itemView.hide();
    };
    $scope.slideHasChanged = function(index){
      console.log(index);
    };

  var cid = $stateParams.capsuleData;
  var userProfile = localStorageService.get('USER_MAIN');
  $scope.capsule = localStorageService.get('capsuleDataPreview');
  
  ServiceCapsule.getCapsule(cid).then(function(result){
   $scope.capsulelist = result.data;
   console.log(result.data);
   if(result.data.length === 0){
     $scope.countItem = 0;
     console.log(result.data.length);
   }else{
      var tmp = result.data.length ;
   
      $scope.countItem = --tmp;
     console.log($scope.countItem);
   }
   
  });
})
.controller('CapsuleListCtrl', function(
  $rootScope,
  $scope,
  $ionicModal,
  $timeout,
  $state,
  $stateParams,
  localStorageService,
  $http,
  $ionicLoading,
  $ionicSlideBoxDelegate,
  ServiceCapsule) {


   $ionicModal.fromTemplateUrl('templates/modals/item.html', {
    animation: 'slide-left-right',
    scope: $scope
  }).then(function(modal) {
    $scope.itemView = modal;
  });



  //item view
    $scope.viewItem = function(data){
      $state.go('app.home.itemList',{itemData:data});
    };
    $scope.closeItem = function(){
      $scope.itemView.hide();
    };
    $scope.slideHasChanged = function(index){
      console.log(index);
    };

  var cid = $stateParams.capsuleData;
  var userProfile = localStorageService.get('USER_MAIN');
  $scope.capsule = localStorageService.get('capsuleDataPreview');
  
  ServiceCapsule.getCapsule(cid).then(function(result){
   $scope.capsulelist = result.data;
   console.log(result.data);
   if(result.data.length === 0){
     $scope.countItem = 0;
     console.log(result.data.length);
   }else{
      var tmp = result.data.length ;
   
      $scope.countItem = --tmp;
     console.log($scope.countItem);
   }
   
  });
})
.controller('FavoritesCtrl', function(
  $rootScope,
  $scope,
  $ionicModal,
  $timeout,
  $state) {

})
.controller('ItemCtrl', function(
  $rootScope,
  $scope,
  $ionicModal,
  $timeout,
  $state,
  $ionicLoading,
  localStorageService,
  $http,
  $stateParams,
  $ionicSlideBoxDelegate) {

 $scope.capsulelist = localStorageService.get('item');
 $scope.itemData = $stateParams.itemData -1;
 console.log($stateParams.itemData);
  // $ionicSlideBoxDelegate.slide(itemData-1);
}).directive('errSrc', function() {
  return {
    link: function(scope, element, attrs) {
      element.bind('error', function() {
        if (attrs.src != attrs.errSrc) {
          attrs.$set('src', attrs.errSrc);
        }
      });
    }
  }
});

