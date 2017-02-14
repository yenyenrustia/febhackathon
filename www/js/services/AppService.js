angular.module('app.services', [])
.service('ServiceApp',function($http,localStorageService,$state){
	var URL_MAIN = 'http://107.170.188.176:8080/';
  //return the full path url
	this.url_main = function(){
		return URL_MAIN;
	}
  //set the USER in localStorage to save as session
  this.user_mainSet = function(data){
  localStorageService.set('USER_MAIN',data.data);
    console.log(data.data);
  }
  //return the USER in location as a session
  this.user_mainGet = function(){
    return localStorageService.get('USER_MAIN');
  }
  this.user_mainRemove = function(){
    localStorageService.remove('USER_MAIN');
  }
  this.user_alreadyAuthenticated = function(){
    var obj = localStorageService.get('USER_MAIN');
     if(obj && obj !== "null" && obj!== "undefined"){
       $state.go('app.home.map');
     }
  }
})
.service('ServiceLogin',function($http,ServiceApp,$ionicLoading,$ionicPopup,localStorageService){
  this.doLogin2 = function(data){
    $ionicLoading.show({});
     var promise = $http.get(ServiceApp.url_main()+'accounts?find=ByUsernameAndPassword&username='+data.username+'&password='+data.password)
     .success(function(data,status){
        $ionicLoading.hide();
         var alertPopup = $ionicPopup.alert({
               title: 'Notification',
               template: 'Welcome '+data.data.username+"!"
             });
     })
     .error(function(data,status){
      console.log(status);

         $ionicLoading.hide();
         if(status === 0){
        var alertPopup = $ionicPopup.alert({
                   title: 'Notification',
                   template: 'No internet connection.'
                 });
         }else
         var alertPopup = $ionicPopup.alert({
                   title: 'Notification',
                   template: 'Wrong username or password. Please try again. '
                 });
     })
     ;
      return promise;
  }

    this.doLogin = function(data){
    $ionicLoading.show({});
     var promise = $http.post(ServiceApp.url_main()+'login',{'username':data.username,'password':data.password})
     .success(function(data,status){
        $ionicLoading.hide();
         var alertPopup = $ionicPopup.alert({
               title: 'Notification',
               template: 'Welcome '+data.data.username+"!"
             });
     })
     .error(function(data,status){
      console.log(status);

         $ionicLoading.hide();
         if(status === 0){
        var alertPopup = $ionicPopup.alert({
                   title: 'Notification',
                   template: 'No internet connection.'
                 });
         }else
         var alertPopup = $ionicPopup.alert({
                   title: 'Notification',
                   template: 'Wrong username or password. Please try again. '
                 });
     })
     ;
      return promise;
  }
        //
})

        //

.service('ServiceCapsule',function($http,ServiceApp,$ionicLoading,$ionicPopup,localStorageService){
 var USER_MAIN = ServiceApp.user_mainGet();
  this.getCapsule = function(cid){
     $ionicLoading.show();
    var result =  $http.get(ServiceApp.url_main()+'items?find=ByCid&cid='+cid+'&uid='+USER_MAIN.uid+'&page=1&pageSize=10')
        .success(function  (data) {
         localStorageService.set('item',data);
         $ionicLoading.hide();
        })
        .error(function(data, status, headers, config,error) {
         $ionicLoading.hide();
       });
        return result;
  }
})
.service('ServiceList',function($http,ServiceApp,$ionicLoading,$ionicPopup,localStorageService){
 var USER_MAIN = ServiceApp.user_mainGet();
  this.getList = function(){
     $ionicLoading.show({});
     var result =  $http.get(ServiceApp.url_main()+'capsules/ByCarrying?carrying=false&uid='+USER_MAIN.uid+'&page=1&pageSize=10')
      .success(function  (data) {
         $ionicLoading.hide();
        })
        .error(function(data, status, headers, config,error) {
         $ionicLoading.hide();
           var alertPopup = $ionicPopup.alert({
           title: 'Notification',
           template: 'Unable to fetch capsule. Please try again. '
         });
       });
        return result;
  }
})
.service('ServiceOurCapsule',function($http,ServiceApp,$ionicLoading,$ionicPopup,localStorageService){
 var USER_MAIN = ServiceApp.user_mainGet();
  this.getOurCapsule = function(cid){
     $ionicLoading.show({});
     var result =   $http.get(ServiceApp.url_main()+'items?find=ByCid&cid='+cid+'&uid='+USER_MAIN.uid+'&page=1&pageSize=10')
      .success(function  (data) {
          localStorageService.set('item',data);
         $ionicLoading.hide();
        })
        .error(function(data, status, headers, config,error) {
         $ionicLoading.hide();
           var alertPopup = $ionicPopup.alert({
           title: 'Notification',
           template: 'Unable to fetch capsule. Please try again. '
         });
       });
        return result;
  }
  this.getOurCapsuleList = function(){
     $ionicLoading.show({});
     var result = $http.get(ServiceApp.url_main()+'capsules/ByCarrying?carrying=false&uid='+USER_MAIN.uid+'&page=1&pageSize=10')
      .success(function  (data) {
          localStorageService.set('item',data);
         $ionicLoading.hide();
        })
        .error(function(data, status, headers, config,error) {
         $ionicLoading.hide();
           var alertPopup = $ionicPopup.alert({
           title: 'Notification',
           template: 'Unable to fetch capsule. Please try again. '
         });
       });
        return result;
  }
})
.service('ServiceMap',function($http,ServiceApp,$ionicLoading,$ionicPopup,localStorageService){
 // var USER_MAIN = ServiceApp.user_mainGet();
 //  this.getCapsule = function(){
 //   var result =  $http.get(ServiceApp.url_main()+'discovery?uid='+USER_MAIN.uid+'&lat=41.30755&lon=-72.5999&page=1&pageSize=10')
 //        .success(function  (data) {
 //         $ionicLoading.hide();
 //        })
 //        .error(function(data, status, headers, config,error) {
 //         $ionicLoading.hide();
 //          var alertPopup = $ionicPopup.alert({
 //           title: 'Notification',
 //           template: 'Something went wrong!'
 //         });
 //       });
 //        return result;
 //  }
});