angular.module('app.controllers', ['app.factory.user'])
.controller('AppCtrl', function($scope, $ionicModal, $state, $timeout, localStorageService) {
  $scope.logout = function () {
    localStorageService.clearAll()
    $state.go('app.signin')
  }
})
.controller('signin', function($scope, $stateParams, $state, User, localStorageService, $ionicPopup, $timeout) {

  $scope.form = {}

  $scope.signin = function () {
    User.signin({
      username : $scope.form.username,
      password : $scope.form.password
    }).success(function(data){
      if(data.log == "login_failed"){
       var popup = $ionicPopup.alert({
         title    : 'login failed',
         template : null,
         buttons  : []
       })

       $timeout(function(){
          popup.close()
       },1000)
      }else if(data.log == "login_success"){
        localStorageService.set('token',data.token)
        localStorageService.set('username',data.username)
        $scope.form = {}
        $state.go('app.home')
      }
    })
  }

  $scope.$on('$stateChangeStart', function(e, to) {
    $scope.form = {}
  })
})
.controller('signup', function($scope, $stateParams, User, $ionicPopup, $timeout, $state) {

  $scope.form = {}

  $scope.signup = function () {
    User.signup({
      username : $scope.form.username,
      password : $scope.form.password
    }).success(function(data){
      switch(data.log){
        case 'username_available':
         var popup = $ionicPopup.alert({
           title    : 'username available',
           template : null,
           buttons  : []
         })

         $timeout(function(){
            popup.close()
         },1000)
        break;
        case 'account_create':
         var alertPopup = $ionicPopup.alert({
           title    : 'account created',
           template : null,
           buttons  : []
         })

         $timeout(function(){
            alertPopup.close()
            $state.go('app.signin')
         },500)
        break;
      }
    })
  }

  $scope.$on('$stateChangeStart', function(e, to) {
    $scope.form = {}
  })
})
.controller('home', function($scope, $stateParams, User) {
  User.home()
  .success(function(data){
    $scope.home = data
  })
})
.controller('settings', function($scope, $stateParams) {

})
