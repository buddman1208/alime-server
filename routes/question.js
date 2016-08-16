module.exports = question;

function question(app, db, randomstr) {
    var newArticleParams = ['title', 'date', 'content', 'author', 'password'];
    var replyArticleParams = ['userid', 'articleid', 'content'];
    var deleteArticleParams = ['userid', 'articleid']
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
}