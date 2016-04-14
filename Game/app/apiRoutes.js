var apiRoutes = express.Router();

apiRoutes.use(function(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
        jwt.verify(token, app.get('superToken'), function(err, decoded) {
            if (err) {
                return res.json({ message: 'Failed to authenticate token' });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(403).send({
            message: 'No token provided'
        })
    }
});

app.use('/api', apiRoutes);

 app.get('api/game',function(req,res){
        res.redirect('/assets/game');
    })