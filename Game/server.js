// server.js

// modules =========================================
var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    passport = require('passport'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    io = require('socket.io'),
    server = require('http').createServer(app);

var port = process.env.PORT || 3000,
    routes = require('./app/routes/routes'),
    jwtConfig = require('./config/jwtConfig'),
    configDB = require('./config/db');

 //Socket setup   
    app.io = require('socket.io')();
    app.io.attach(server)
    app.io.on('connection', require('./app/sockets/socket'));


// configuration ===================================
mongoose.connect(configDB.getDbConnectionString());

require('./config/passport')(passport);

app.set('superSecret', jwtConfig.secret);
//app.use('/api', expressJwt({secret: jwtConfig.secret}));
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/assets', express.static(__dirname + '/public'));
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');

server.listen(port);

console.log("Listening at port " + port);

routes(app, passport);
