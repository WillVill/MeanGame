angular.module('appRoutes', [])

.config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider){
    
    $routeProvider

    .when('/game',{
        templateUrl: 'assets/views/game.ejs',
        controller: 'gameController'
    })
    .when('/login',{
        templateUrl: 'assets/views/login.ejs',
        controller: 'authenticationController'
    })
    .when('/signup',{
        templateUrl: 'assets/views/signup.ejs',
        controller: 'authenticationController'
    });
    
    $locationProvider.html5Mode(true);
}]);