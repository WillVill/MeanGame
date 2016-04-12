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
    
    passport.use('local-signup',new localStrategy({
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true
        },
    function(req, username, password, done){
        process.nextTick(function(){
            User.findOne({'local.username': username }, function(err, user){
                if(err) 
                    return done(err)
                
                if(user){
                    return done(null, false, {err:'Username Taken'})
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

    passport.use('local-login', new localStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, username, passowrd, done){
        User.findOne({'local.username': username}, function(err, user){
            if(err)
                return done(err);
            if(!user)
                return done(null, false,{err: 'No user found.'});
            if(!user.validPassword(password))
                return done(null, false, {err:'Wrong password'})
            return done(null, user);
        })
    }));

};