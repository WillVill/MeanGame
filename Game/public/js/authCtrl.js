angular.module('authCtrl', [])


.controller('authenticationController', function($scope, $http, $location){
    
    $scope.user = {};
    
    $scope.submitForm = function(isValid){
        if(isValid){
            
            $http.post('/signup', $scope.user)
            .success(function(data, status){
                $location.path('/game');
            })
            .error(function(err, status){
                if(status === 401){
                    alert('Username Already Taken');
                }
                if(status === 500){
                    alert('Our servers are facing problems. Try again later.');
                }
            })
        } else{
            alert('Invalid input');
        };
    };

    $scope.loginAuth = function(){

            $http.post('/auth', $scope.user)
                .success(function(data, staus){
                    $location.path('/game');
                })
                .error(function(err, status){
                if(status === 401){
                    alert('Wrong password or username');
                }
                if(status === 500){
                    alert('Our servers are facing problems. Try again later.');
                }
                })
    };
});