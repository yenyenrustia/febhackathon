angular.module('feedback.controllers', [])
.controller('FeedbackCtrl', function(
 $rootScope,
  $scope,
  $ionicModal,
  $timeout,
  $state,
  $ionicLoading,
  $http,
  localStorageService,
  $ionicPopup) {
    $scope.data = {
    	name:"",
    	email: " ",
    	subject:"",
    	message:""
    }

	$scope.SendFeedback = function(data){
    $ionicLoading.show();

    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
			console.log(data);
      var headers = {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      };
       var postObject = new Object();
      postObject.email = data.email;
      postObject.name =data.name;
      console.log(postObject);
	      $http({method:"POST",headers:headers,url:'https://support@capsules.io',data:postObject}).
  success(function(data, status, headers, config) {
    // this callback will be called asynchronously
    // when the response is available
    console.log(data);
    $ionicLoading.hide();
      var alertPopup = $ionicPopup.alert({
     title: 'Notification',
     template: 'Send Email!'
   });
  }).
  error(function(data, status, headers, config) {
     $ionicLoading.hide();
       var alertPopup = $ionicPopup.alert({
     title: 'Notification',
     template: 'Failed Sending Email!'
   });
    // called asynchronously if an error occurs
    // or server returns response with an error status.
     console.log(data);
     console.log(status);
     console.log(headers);
     console.log(config);
  });		
	}
});