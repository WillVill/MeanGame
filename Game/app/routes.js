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
    
    app.post('/signup', passport.authenticate('local-signup',{
        console.log('hello there');
        successResdirect : '/game',
        failureFlash: true
    }));
    
    function isLoggedIn(req, res, next){
        if(req.isAuthenticated())
            return next();
            
        res.redirect('/');
    }
};