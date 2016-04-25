angular.module('app')
    .controller('chatController',['$scope','socket', 'userService', function ($scope, socket, userService) {

        $scope.messages = [];
        $scope.users = [];
        $scope.currentUser = userService.getUsername();
        
        $scope.sendMessage = function () {
            socket.emit('send:message', $scope.messageInput);
            $scope.messageInput = '';
            console.log(userService.getUsername());
        };

        socket.on('receive:message', function (message) {
            $scope.messages.push({
                body: message.data
            });
        });

        socket.on('users', function (users) {
            $scope.users = [];
            users.forEach(function (user) {
                $scope.users.push(user);
            });
        })
    }]);