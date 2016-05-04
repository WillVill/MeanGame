angular.module('app')
    .controller('authenticationController',['$scope', '$http', '$location','$window','socket','userService','$rootScope',
     function($scope, $http, $location, $window,socket,userService,$rootScope) {

        $scope.user = {};
        $scope.isAuthenticated = false;
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

        $scope.loginAuth = function() {

            $http.post('/auth', $scope.user)
                .success(function(data, status, headers, config) {
                    $window.sessionStorage.token = data.token
                    $scope.isAuthenticated = true;
                    socket.emit('add user', $scope.user.username);
                    userService.setUsername($scope.user.username);
                    console.log(userService.getUsername());
                    userService.setAuthStatus(true);
                    $location.path('/game');
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