angular.module('app.factory.user',[
    'app.config'
])
.factory('User',User);

function User($http, Config, localStorageService) {
    var user = {
    	signin : signin,
    	signup : signup,
    	home   : home
    }

    function signin (data) {
    	return $http({
		    method  : 'POST',
		    url     : Config.url('/user/signin'),
		    data    : data,
		    headers : { 'Content-Type': 'application/json; charset=UTF-8' }
		})
    }

    function signup (data) {
		return $http({
		    method  : 'POST',
		    url     : Config.url('/user/signup'),
		    data    : data,
		    headers : { 'Content-Type': 'application/json; charset=UTF-8' }
		})    
	}

	function home () {
		return $http({
		    method  : 'GET',
		    url     : Config.url('/user/home'),
		    headers : { 
		    	'Authorization' : localStorageService.get('token')
		    }
		})		
	}

    return user
}