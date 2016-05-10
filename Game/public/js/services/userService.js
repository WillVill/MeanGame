angular.module('app')
    .service('userService', function () {
        var user = {
            'username': null,
            'isAuth': false
        }
        this.setUsername = function (username) {
            user.username = username;
        }
        this.getUsername = function () {
            return user.username;
        }

        this.setAuth = function (status) {
            user.isAuth = status;
        }

        this.isAuth = function () {
            return user.isAuth;
        }
    })
    