var User = require('./models/user.js');
var jwt = require('jwt-simple');

module.exports = function(app, passport){
    
    //GET
    app.get('*', function(req, res){
        res.render('../public/index',{user: 'Will'});
    });
    
    app.get('/api/users', function(req, res){
        User.find(function(err, users){
            if(err) res.send(err);
            
            res.json(users);
        })
    })
    
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
    
    app.get('/game',function(req,res){
        res.redirect('/assets/game');
    })

    // POST
    app.post('/signup', passport.authenticate('local-signup', {

    }));
    
    app.post('/auth', function(req, res, next) {
  passport.authenticate('local-login', function(err, user, info) {
    if (err) { return next(err) }
    if (!user) {
      return res.json(401, { error: 'message' });
    }

    //user has authenticated correctly thus we create a JWT token 
    var token = jwt.encode({ username: 'somedata'}, "tokenSecret");
    res.json({ token : token });

  })(req, res, next);
});
    //functions
    
    function isLoggedIn(req, res, next){
        if(req.isAuthenticated())
            return next();
            
        res.redirect('/');
    }
};