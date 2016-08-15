var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongo = require('../mongo');
var randomstring = require('randomstring');
var router = express.Router();
module.exports = router;

router.post('/login', function (req, res) {
  var user_id = req.body.id;
  // var token = req.body.token;
  var user_pwd = req.body.password;
  mongo.User.findOne({id: user_id}, function(err, doc){
    if(doc!=null){
      if(doc.id == user_id && doc.password == user_pwd){
        mongo.User.update({id : user_id}, {isLogin : true}, function(err, numAffected){
          if(err) throw err;
        });
        res.send(doc);
      } else res.sendStatus(400);
    } else res.sendStatus(400);
  });
});

router.post('/logout', function(req, res){
  var user_apikey = req.body.apikey;
  mongo.User.update({apikey : user_apikey}, {isLogin : false}, function(err, numAffected){
    if(err) res.sendStatus(401);
    else{
      console.log(numAffected);
      res.sendStatus(200);
    }
  });
});

router.post('/loginValidate', function(req, res){
  var user_apikey = req.body.apikey;
  mongo.User.findOne({apikey : user_apikey}, function(err, doc){
    if(doc!=null){
		console.log(doc.isLogin);
      if (doc.isLogin == true) {
        mongo.User.update({apikey : user_apikey},{isLogin:true} ,function(err, numAffected){
            if(err) {
				res.sendStatus(400); 
				console.log(err);
			}
        });
		res.send(doc);
      }
      else {
		  res.sendStatus(400);
		  console.log('asdf');
	  }
	}else res.sendStatus(400);
  });
});

router.post('/register', function (req, res) {
  var user_id = req.body.id;
  var user_pwd = req.body.password;
  var user_name = req.body.name;
  var isParent = req.body.isParent;
  mongo.User.find({id : user_id}, function(err, docs){
    if(docs.length==0) {
      var newUser = new mongo.User({
        id : user_id,
        password : user_pwd,
        name : user_name,
        apikey : randomstring.generate(),
        isLogin : false,
		      isParent : isParent,
          article : [], 
		  targetName : null, 
		  targetApikey  :null
      });
      newUser.save();
      res.send(newUser);
      console.log(newUser);
    } else res.sendStatus(409);
  });
});
