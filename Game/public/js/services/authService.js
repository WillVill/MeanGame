angular.module('app')
    .factory('tokenInterceptor', ['$rootScope', '$q', '$window','userService', function ($rootScope, $q, $window, userService) {
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
                if (rejection != null && rejection.status === 401 && ($window.sessionStorage.token || userService.getAuthStatus())) {
                    delete $window.sessionStorage.token;
                    userService.setAuthStatus(false);
                    $location.path("/admin/login");
                }
                return $q.reject(rejection);
            }
        };
    }])
   /**  .config('$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('tokenInterceptor');
    });
   */