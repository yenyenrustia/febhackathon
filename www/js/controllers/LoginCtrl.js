angular.module('login.controllers', [])
.controller('LoginCtrl', function(
  $rootScope,
  $scope,
  $ionicModal,
  $timeout,
  $state,
  $http,
  $ionicLoading,
  $ionicPopup,
  localStorageService,
  ServiceLogin,
  ServiceApp) {
  
      //service check if authenticated then redirects.
       ServiceApp.user_alreadyAuthenticated();
    $scope.login = {
      username:"",
      password:"",
    };

    $scope.cancel = function(){
      $scope.login = {
      username:"",
      password:"",
    };
    }
    $scope.submitLogin = function(data){
      console.log('press');
    	 $state.go('app.home.map'); 
        // var login = ServiceLogin.doLogin(data).then(function(data){
        //      if(data.status===200){
        //       $scope.user = ServiceApp.user_mainSet(data);
        //       $scope.login = {
        //         username:"",
        //         password:""
        //       }
              
        //        var alertPopup = $ionicPopup.alert({
        //        title: 'Notification',
        //        template: 'Welcome '+data.data.username+"!"
        //      });
        //      }
        // });
      
    }

});
