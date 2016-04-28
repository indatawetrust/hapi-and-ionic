angular.module('app', ['ionic', 'app.controllers','LocalStorageModule'])

.run(function($ionicPlatform, $rootScope, $state, localStorageService) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

  $rootScope.$on('$stateChangeStart', function(e, to) {
    if (to.auth) {
      if(!localStorageService.get('token')){
        e.preventDefault()
        $rootScope.isLogin = false
        $state.go('app.signin')
      }else{
        $rootScope.isLogin = true
      }
    }else{
      $rootScope.isLogin = false
    }
  })
})

.config(function($stateProvider, $urlRouterProvider) {
  
  $stateProvider
  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
  .state('app.signin', {
    url   : '/signin',
    views : {
      'menuContent' : {
        templateUrl : 'templates/signin.html',
        controller  : 'signin'
      }
    }
  })
  .state('app.signup', {
    url   : '/signup',
    views : {
      'menuContent' : {
        templateUrl : 'templates/signup.html',
        controller  : 'signup'
      }
    }
  })
  .state('app.home', {
    url   : '/home',
    views : {
      'menuContent' : {
        templateUrl : 'templates/home.html',
        controller  : 'home'
      }
    },
    auth : true
  })
  .state('app.settings', {
    url   : '/settings',
    views : {
      'menuContent' : {
        templateUrl : 'templates/settings.html',
        controller  : 'settings'
      }
    },
    auth : true
  })

  $urlRouterProvider.otherwise('/app/signin');
});
