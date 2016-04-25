// server.js

// modules =========================================
var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    passport = require('passport'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    jwt = require('jsonwebtoken'),
    io = require('socket.io'),
    server = require('http').createServer(app),
    expressJwt = require('express-jwt');

var port = process.env.PORT || 3000,
    routes = require('./app/routes/routes'),
    jwtConfig = require('./config/jwtConfig'),
    configDB = require('./config/db'),
    socketRoutes = require('./app/routes/apiRoutes');
    
    app.io = require('socket.io')();
    app.io.attach(server)
    app.io.on('connection', require('./app/routes/socket'));


// configuration ===================================
mongoose.connect(configDB.getDbConnectionString());

require('./config/passport')(passport);

app.set('superSecret', jwtConfig.secret);
app.use('/api', expressJwt({secret: jwtConfig.secret}));
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
