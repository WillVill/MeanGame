angular.module('app')

    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

        $routeProvider

            .when('/api/game', {
                templateUrl: 'assets/views/game.ejs',
                controller: 'gameController',
            })
            .when('/login', {
                templateUrl: 'assets/views/login.ejs',
                controller: 'authenticationController',
            })
            .when('/signup', {
                templateUrl: 'assets/views/signup.ejs',
                controller: 'authenticationController',
            })
            .when('/chat', {
                templateUrl: 'assets/views/chat.ejs',
                controller: 'chatController',
            })
            .when('/', {
                templateUrl: 'assets/views/home.ejs',
                controller: 'chatController',
            })
        $locationProvider.html5Mode(true);
    }]);

