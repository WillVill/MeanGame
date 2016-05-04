angular.module('app')
    .service('userService', function () {
        var user = {
            'username': null,
            'authentication': false
        }
        this.setUsername = function (username) {
            user.username = username;
        }
        this.getUsername = function () {
            return user.username;
        }

        this.setAuthStatus = function (status) {
            isLogged = status;
        }

        this.getAuthStatus = function () {
            return isLogged;
        }
    })
    