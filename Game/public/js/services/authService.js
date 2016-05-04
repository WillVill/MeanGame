angular.module('app')
    .factory('authInterceptor', ['$location', 'authService', 'API_URL', 'userService',
    function ($location, authService, API_URL, userService) {
        return {
            request: function (config) {
                var token = authService.getToken();
                if(config.url.indexOf(API_URL) === 0 && token){
                    config.headers.Authorization = 'bearer' + token;
                }
                return config;
            },
            response: function (res) {
                if(res.config.url.indexOf(API_URL) === 0 && res.data.token){
                    auth.saveToken(res.data.token);
                    userService.setAuthStatus(true);
                }
                return res;
            },
        };
    }])

    .service('authService', ['$window', function ($window) {
        self.parseJwt = function (token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse($window.atob(base64));
        }
        this.saveToken = function (token) {
            $window.localStorage['jwtToken'] = token;
        }
        this.getToken = function () {
            return $window.localStorage['jwtToken'];
        }
        this.isAuthed = function () {
            var token = self.getToken();
            if (token) {
                var params = self.parseJwt(token);
                return Math.round(new Date().getTime() / 1000) <= params.exp;
            } else {
                return false;
            }
        }
        this.logout = function () {
            $window.localStorage.removeItem('jwtToken');
        }
    }])

    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    });