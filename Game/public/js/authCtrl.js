angular.module('authCtrl', [])


.controller('authenticationController', function($scope, $http, $location){
    
    $scope.user = {};
    
    var baseUrl = "http:localhost:3000"
    $scope.submitForm = function(isValid){
        if(isValid){
            
            $http.post('/signup', $scope.user)
            .success(function(data){
                alert('You are now registered!');
                $location.path('/');
            })
            .error(function(err){
                                alert('fail');
                $scope.errorMessage = err;
            })
        } else{
            alert('not valid');
        }
        
        
    };  
});