angular.module('appRoutes', [])

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
            .otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode(true);
    }]);

