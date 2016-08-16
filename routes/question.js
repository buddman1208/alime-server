module.exports = question;

function question(app, db, randomstr) {
    var newArticleParams = ['title', 'date', 'content', 'author', 'password'];
    var replyArticleParams = ['userid', 'articleid', 'content'];
    var deleteArticleParams = ['userid', 'articleid']
    app.post('/question/listArticle', function (req, res) {
        db.Question.find({}, function (err, docs) {
            if (err) throw err;
            if (docs.length == 0) res.sendStatus(403);
            else res.send(docs);
        })
    });
    app.post('/question/newArticle', function (req, res) {
        if (newArticleParams.every(str => req.body[str] != undefined || req.body[str] != null)) {
            var newArticle = new db.Question({
                articleid: randomstr.generate(),
                reply: ''
            });
            newArticleParams.forEach(str => newArticle[str] = req.body[str]);
            newArticle.save(function (err) {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                } else {
                    res.send(newArticle);
                    console.log(newArticle);
                }
            })
        } else res.sendStatus(403);
    });
    app.post('/question/replyArticle', function (req, res) {
        if (replyArticleParams.every(str => req.body[str] != undefined || req.body[str] != null)) {
            db.User.findOne({id: req.body.id}, function (err, doc) {
                if (doc != null) {
                    if (doc.isAdmin == true) {
                        db.Question.findOneAndUpdate({articleid: req.body.articleid}, {reply: req.body.content}, function (err, results) {
                            if (err) console.log(err);
                            else res.sendStatus(200);
                        });
                    } else res.sendStatus(401);
                } else res.sendStatus(401);
            })
        } else res.sendStatus(403);
    });
    app.post('/question/deleteArticle', function (req, res) {
        db.Question.findOneAndRemove({author: req.body.userid, articleid: req.body.articleid}, function (err, result) {
            if (err) {
                throw err;
            } else res.sendStatus(200);
        });
    });
}