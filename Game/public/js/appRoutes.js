angular.module('app')

    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

        $routeProvider

            .when('/api/game', {
                templateUrl: 'assets/views/game.ejs',
                controller: 'gameController',
                access: { requiredLogin: true }
            })
            .when('/login', {
                templateUrl: 'assets/views/login.ejs',
                controller: 'authenticationController',
                access: { requiredLogin: false }
            })
            .when('/signup', {
                templateUrl: 'assets/views/signup.ejs',
                controller: 'authenticationController',
                access: { requiredLogin: false }
            })
            .when('/chat', {
                templateUrl: 'assets/views/chat.ejs',
                controller: 'chatController',
                access: { requiredLogin: true }
            })
            .when('/', {
                templateUrl: 'assets/views/home.ejs',
                controller: 'chatController',
                access: { requiredLogin: true }
            })
            .otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode(true);
    }]);

