angular.module('app')
    .factory('authenticationService', function(){
        var auth = 
        {
            isLogged = false
        }
        return auth;
    })
    .factory('tokenInterceptor', ['$rootScope', '$q', '$window','authenticationService', function ($rootScope, $q, $window, authenticationService) {
        return {
            request: function (config) {
                config.headers = config.headers || {};
                if ($window.sessionStorage.token) {
                    config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
                }
                return config;
            },
            requestError: function (rejection) {
                return $q.reject(rejection);
            },
            response: function (response) {
                if (response.status === 401) {
                    alert('login please')
                }
                return response || $q.when(response);
            },
            responseError: function (rejection) {
                if (rejection != null && rejection.status === 401 && ($window.sessionStorage.token || authenticationService.isLogged)) {
                    delete $window.sessionStorage.token;
                    authenticationService.isLogged = false;
                    $location.path("/admin/login");
                }
                return $q.reject(rejection);
            }
        };
    }])
    .config('$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('tokenInterceptor');
    });