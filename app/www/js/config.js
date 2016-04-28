angular.module('app.config',[])
.constant('conf',{
	url : 'http://localhost:8000'
})
.factory('Config',Config);

function Config(conf) {
    var config = {};
    
    config.url = function (to) {
        return conf.url + to;
    };

    return config;
}