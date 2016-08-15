var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongo = require('../mongo');
var randomstring = require('randomstring');
var router = express.Router();
module.exports = router;

router.post('/postArticle',function(req, res, next){
	var apikey = req.body.apikey;
	var title = req.body.title;
	var content = req.body.content;
	var newArticle = new mongo.Article({
		title : title, 
		content : content, 
		apikey : apikey, 
		articleKey : req.file.filename
	});
	newArticle.save(function(err){
		if(err) console.log(err);
	});
	res.sendStatus(200);
});
router.post('/listArticle',function(req, res){
	var apikey = "\""+req.body.apikey+"\"";
	console.log('apikey : '+apikey);
  mongo.Article.find({apikey:apikey}, function(err, docs){
	  if(docs.length!=0) res.send(docs);
	  else res.sendStatus(400);
  })
});
