angular.module('starter', ['ionic',
 'app.controllers',
 'feedback.controllers',
 'map.controllers',
 'ourcapsule.controllers',
 'intro.controllers',
 'login.controllers', 
 'app.services',
 'starter.directives',
 'LocalStorageModule',
 'uiGmapgoogle-maps', 
 'ngCordova'])
.run(function($ionicPlatform,$ionicPopup,$state,ServiceApp,$cordovaSplashscreen) {
    $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
 setTimeout(function() {
    $cordovaSplashscreen.hide()
  }, 5000)
    if ($state.current.url === '^') {
      console.log(ServiceApp.user_mainGet());
      if (ServiceApp.user_mainGet()) {
        $state.transitionTo('app.home.map');
      } else {
        $state.transitionTo('login');
      }
   }

     if(window.Connection) {
                if(navigator.connection.type == Connection.NONE) {
                    $ionicPopup.confirm({
                        title: "Internet Disconnected",
                        content: "The internet is disconnected on your device."
                    })
                    .then(function(result) {
                        if(!result) {
                            ionic.Platform.exitApp();
                        }
                    });
                }
            }
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider, $urlRouterProvider,uiGmapGoogleMapApiProvider, $ionicConfigProvider) {
   uiGmapGoogleMapApiProvider.configure({
    key: 'AIzaSyDFberVyWaVDCxFLaRxYLxUuSd4uPb_I2s',
    v: '3.17',
    libraries: 'weather,geometry,visualization',
    language: 'en',
    sensor: 'false',
  });
  $ionicConfigProvider.backButton.previousTitleText(false).text(' ');
  $stateProvider
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
    })
     .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
    })
      .state('register', {
      url: '/register',
      templateUrl: 'templates/register.html',
      controller: 'RegisterCtrl'
    })
    .state('app.intro', {
      url: '/intro',
      views: {
        'menuContent': {
          templateUrl: 'templates/intro.html',
          controller: 'IntroCtrl'
        }
      }
    })
    .state('app.ourcapsule', {
      url: '/ourcapsule',
      abstract:true,
      views: {
        'menuContent': {
          templateUrl: 'templates/ourcapsule.html',
          controller: 'OurCapsuleCtrl'
        }
      }
    })
     .state('app.ourcapsule.tab', {
      url: '/ourcapsuleTab/:id',
      views: {
        'ourcapsuleItem': {
          templateUrl: 'templates/capsule.html',
          controller: 'OurCapsuleTabCtrl',
          params:['id']
        }
      }
    })
    .state('app.ourcapsule.item', {
      url: '/ourcapsuleItem/:id',
      views: {
        'ourcapsuleItem': {
          templateUrl: 'templates/item.html',
          controller: 'OurCapsuleItemCtrl',
          params:['id']
        }
      }
    })
   .state('app.ourcapsule.list', {
      url: '/ourcapsuleList',
      views: {
        'ourcapsuleItem': {
          templateUrl: 'templates/ourcapsuleList.html',
          controller: 'OurCapsuleListCtrl'
        }
      }
    })

    .state('app.favorites', {
      url: '/favorites',
      views: {
        'menuContent': {
          templateUrl: 'templates/favorites.html',
          controller: 'FavoritesCtrl'
        }
      }
    })
     .state('app.feedback', {
      url: '/feedback',
      views: {
        'menuContent': {
          templateUrl: 'templates/feedback.html',
          controller: 'FeedbackCtrl'
        }
      }
    })
    .state('app.settings', {
      url: '/settings',
      views: {
        'menuContent': {
          templateUrl: 'templates/settings.html'
        }
      }
    })

    .state('app.home', {
      url: '/home',
      abstract: true,
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html',
          controller: 'HomeCtrl'
        }
      }
    })
      .state('app.home.capsule', {
      url: '/capsule/:capsuleData',
      views: {
        'tab-map': {
          templateUrl: 'templates/capsule.html',
          controller: 'CapsuleCtrl',
          params:['capsuleData']
        }
      }
    })
          .state('app.home.list', {
      url: '/list',
      views: {
        'tab-map': {
          templateUrl: 'templates/tab-list.html',
          controller: 'ListViewCtrl'
        }
      }
    })
    .state('app.home.item', {
      url: '/item/:itemData',
      views: {
        'tab-map': {
          templateUrl: 'templates/item.html',
          controller: 'ItemCtrl',
          params:['itemData']
        }
      }
    })
    .state('app.home.map', {
      url: '/map/?latitude&longitude',
      views: {
        'tab-map': {
          templateUrl: 'templates/tab-map.html',
          controller: 'MapCtrl'
        }
      }
    })

    .state('app.home.card', {
      url: '/card',
      views: {
        'tab-card': {
          templateUrl: 'templates/tab-card.html',
          controller: 'CardViewCtrl'
        }
      }
    })
    .state('app.home.listItem', {
      url: '/listItem',
      views: {
        'tab-list': {
          templateUrl: 'templates/tab-list.html',
          controller: 'ListViewCtrl'
        }
      }
    })
    .state('app.home.capsuleList', {
      url: '/capsule/:capsuleData',
      views: {
        'tab-list': {
          templateUrl: 'templates/capsule.html',
          controller: 'CapsuleListCtrl',
          params:['capsuleData']
        }
      }
    })
        .state('app.home.itemList', {
      url: '/item/:itemData',
      views: {
        'tab-list': {
          templateUrl: 'templates/item.html',
          controller: 'ItemCtrl',
          params:['itemData']
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});


