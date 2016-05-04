var User = require('../models/user.js');
var jwt = require('jwt-simple');

module.exports = function (app, passport) {

    //GET
    app.get('*', function (req, res) {
        res.render('../public/index', { user: 'Will' });
    });

    app.get('/users', function (req, res) {
        User.find(function (err, users) {
            if (err) res.send(err);

            res.send("user");
        })
    })

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    // POST
    app.post('/signup', passport.authenticate('local-signup', {

    }));

    app.post('/auth', function (req, res, next) {
        passport.authenticate('local-login', function (err, user, info) {
            if (err) { 401, { success: false, error: 'message' } }
            if (!user) {
                return res.json(401, { success: false, error: 'message' });
            }

            //user has authenticated correctly thus we create a JWT token 
            var token = jwt.encode(user, app.get('superSecret'));
            res.json({
                success: true,
                message: 'Sick token bro',
                token: token,

            });

        })(req, res, next);
    });

};


