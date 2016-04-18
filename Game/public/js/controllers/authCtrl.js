angular.module('authCtrl', [])


    .controller('authenticationController',['$scope', '$http', '$location', function($scope, $http, $location) {

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

        $scope.loginAuth = function() {

            $http.post('/auth', $scope.user)
                .success(function(data, status, headers, config) {
                    $window.sessionStorage.token = data.token
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