var localStrategy = require('passport-local').Strategy;

var User = require('../app/models/user');

module.exports = function(passport) {
    passport.serializeUser(function(user, done){
        done(null, user.id);
    });
    
    passport.deserializeUser(function(id, done){
        User.findById(id, function(err, user){
            done(err,user);
        });
    });
    
    // LOCAL SIGNUP ====================================================================
    
    passport.use('local-signup', new localStrategy({
        usernameField: 'username', //username and password are selected by default
        passwordField: 'password', // incase I would like to change later on
        passReqToCallback: true // pass request back to callback
    },
    function(req, username, password, done){
        process.nextTick(function(){
            User.findOne({'local.username': username }, function(err, user){
                if(err) 
                    return done(err)
                
                if(user){
                    return done(null, false, req.flash('signupMessage', 'The username is already taken.'))
                } else{
                    var newUser = new User();
                    newUser.local.username = username;
                    newUser.local.password = newUser.generateHash(password);
                    
                    newUser.save(function(err){
                        if(err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });
        });
    }));
};