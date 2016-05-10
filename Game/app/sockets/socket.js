var users = [];

module.exports = function(socket){

    function broadcast(type, payload) {
        socket.emit(type, payload);
        socket.broadcast.emit(type, payload);
    }
    
    socket.on('connection', function (socket) {
        console.log('socket.io connected');
    });

    socket.on('send:message', function (data) {
        console.log('message');
        broadcast('receive:message', {
            data: data
        });
    });

    socket.on('add user', function (username) {
        console.log("user" + username);
        socket.username = username;
        users.push(socket.username);
        broadcast('users', users);
    });
};