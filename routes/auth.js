module.exports = init;

function init(app, mongo) {
    var randomstr = require('randomstring');
    var loginParams = ['userid', 'password'];
    var registerParams = ['userid', 'password', 'username', 'isAdmin', 'attendType'];

    app.post('/auth/login', function (req, res) {
        if (loginParams.every(str => req.body[str] != undefined)) {
            mongo.User.findOne({userid: req.body.userid}, function (err, doc) {
                if (doc != null) {
                    if (loginParams.every(str => req.body[str] == doc[str])) {
                        res.send(doc);
                        console.log('User Login : \n' + doc);
                    } else res.sendStatus(400);
                } else res.sendStatus(400);
            });
        } else res.sendStatus(403);
    });

    app.post('/auth/register', function (req, res) {
        if (registerParams.every(str => req.body[str] != undefined || req.body[str] != null)) {
            mongo.User.find({userid: req.body.userid}, function (err, docs) {
                if (docs.length == 0) {
                    var newUser = new mongo.User({
                        id: randomstr.generate()
                    });
                    registerParams.forEach(a => newUser[a] = req.body[a]);
                    console.log(newUser);
                    newUser.save();
                    res.send(newUser);
                } else res.sendStatus(409);
            });
        } else res.sendStatus(403);
    });
}