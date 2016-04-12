var User = require('./models/user.js');

module.exports = function(app, passport){
    
    app.get('*', function(req, res){
        res.render('../public/index',{user: 'Will'});
    });
    
    app.get('/api/users', function(req, res){
        User.find(function(err, users){
            if(err) res.send(err);
            
            res.json(users);
        })
    })
    
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/game'
    }));
    
    function isLoggedIn(req, res, next){
        if(req.isAuthenticated())
            return next();
            
        res.redirect('/');
    }

    app.post('/login', function(req, res, next){
        passport.authenticate('local-login',
            function(err, user, info) {
        if (err) { return next(err) }
        if (!user) {
            return res.json(401, { error: 'message' });
        }
                var token = jwt.encode({ username: user}, "ThisIsATokenSecret");
                res.json({ token : token });

    })(req, res, next);
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};