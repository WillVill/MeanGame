angular.module('app')
.service('userService', function(){
    var user = {
        'username': null, 
    }
    this.setUsername = function(username){
        user.username = username;
    }
    this.getUsername = function(){
        return user.username;
    }
})