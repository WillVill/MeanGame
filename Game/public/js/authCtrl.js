angular.module('authCtrl', [])


.controller('authenticationController', function($scope, $http, $location){
    
    $scope.user = {};
    
    $scope.submitForm = function(isValid){
        if(isValid){
            
            $http.post('/signup', $scope.user)
            .success(function(data, status){
                alert(data);
            })
            .error(function(err){
                alert(err);
            })
        } else{
            alert('Invalid input');
        };
    };

    $scope.loginAuth = function(){

            $http.post('/login', $scope.user)
                .success(function(data){
                    alert(data);

                })
                .error(function(err){
                    alert(err);
                    $scope.errorMessage = err;
                })
    };
});