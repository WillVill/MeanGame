angular.module('app')
    .controller('authenticationController',['$scope', '$http', '$location','$window','socket','userService','$rootScope', 'authService',
     function($scope, $http, $location, $window,socket,userService,$rootScope,authService) {

         $scope.isAuthenticated = function(){
             console.log(authService.isAuthed());
             return authService.isAuthed();
         };
        $scope.user = {};
        $scope.submitForm = function(isValid) {
            if (isValid) {

                $http.post('/signup', $scope.user)
                    .success(function(data, status) {
                        $location.path('/game');
                    })
                    .error(function(err, status) {
                        if (status === 401) {
                            alert('Username Already Taken');
                        }
                        if (status === 500) {
                            alert('Our servers are facing problems. Try again later.');
                        }
                    })
            } else {
                alert('Invalid input');
            };
        };

         $scope.logout = function(){
             authService.logout();
         }

        $scope.loginAuth = function() {

            $http.post('/auth', $scope.user)
                .success(function(data, status, headers, config) {
                    authService.saveToken(data.token),
                    userService.setAuth(true),
                        $scope.isAuthenticated = true;
                    socket.emit('add user', $scope.user.username),
                    userService.setUsername($scope.user.username),

                        $location.path('/');
                })
                .error(function(err, status) {
                    delete $window.sessionStorage.token;
                    if (status === 401) {
                        alert('Wrong password or username');
                    }
                    if (status === 500) {
                        alert('Our servers are facing problems. Try again later.');
                    }
                })
        };
    }]);