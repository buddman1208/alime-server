	var express = require('express');
	var path = require('path');
	var cookieParser = require('cookie-parser');
	var bodyParser = require('body-parser');
	var session = require('express-session');
	var mongo = require('../mongo');
	var randomstring = require('randomstring');
	var gcm = require('node-gcm');
	var fs = require('fs');
	var server_api_key = 'AIzaSyB_pSJ2Ph6FRcd5TgS0foigWwaG8_C8L3o';
	var sender = new gcm.Sender(server_api_key);
	var registrationIds = [];
	var router = express.Router();
	module.exports = router;
//
//
router.post('/findParent', function(req,res){
  mongo.User.findOne({id : req.body.id}, function(err, doc){
    console.log(doc);
    if(doc!=null) {
      if(doc.isParent==true){
        res.send({
          name : doc.name,
          id : doc.id,
          apikey : doc.apikey
        });
      } else res.sendStatus(400);
    } else res.sendStatus(400);
  });
});

 router.post('/registerParent', function(req,res){
   var name = req.body.name;
   var apikey = req.body.apikey;
   var targetName = req.body.targetName;
   var targetApikey = req.body.targetApikey;
   var newArticle = new mongo.Article({
	   	articleGroupKey : randomstring.generate(),
		article : []
   })
   newArticle.save();
   var groupKey  =  newArticle.articleGroupKey;
   mongo.User.update({apikey:apikey}, {targetApikey : targetApikey, targetName : targetName, articleGroupKey : groupKey}, function(err, numAffected){
     if(!err){
       mongo.User.update({apikey:targetApikey}, {targetApikey : apikey, targetName : name, articleGroupKey : groupKey }, function(err, numAffected){
         if(err) res.sendStatus(401);
         else mongo.User.findOne({apikey:targetApikey}, function(err, doc){
           res.send(doc);
         });
       });
     }
   });
 });
// router.post('/checkMyChild', function(req, res){
//   var apikey = req.body.apikey;
//
//   mongo.User.findOne({apikey:apikey}, function(err, doc){
//     if(doc.targetApikey == null) res.sendStatus(422);
//     else mongo.User.findOne({apikey:doc.targetApikey}, function(err, doc){
//       res.send(doc);
//     });
//   });
// });
//
// router.post('/getMyStatus', function(req, res){
//   var apikey = req.body.apikey;
//   mongo.User.findOne({apikey:apikey}, function(err, doc){
//     if(err) res.sendStatus(400);
//     else res.send(doc);
//   });
// });
//
// router.post('/finishArticle', function(req, res){
//   var token;
//   var apikey = req.body.targetApikey;
//   var articleKey = req.body.articleKey;
//   var articleTitle, articleContent;
//   mongo.User.findOne({apikey:apikey}, function(err, doc){
//     if(err) throw err;
//     else token = doc.token;
//   });
//   mongo.Article.findOne({articleKey : articleKey}, function(err, doc){
//       if(err) res.sendStatus(400);
//       else{
//         articleTitle = doc.title;
//         articleContent = doc.content;
//         var message = new gcm.Message({
//             collapseKey: 'demo',
//             delayWhileIdle: true,
//             timeToLive: 10,
//             data: {
//                 type : "toParent",
//                 title: '자녀가 과제를 완료했어요!',
//                 message: '알림을 눌러 확인해주세요.',
//                 articleKey : articleKey,
//                 articleTitle : articleTitle,
//                 articleContent : articleContent
//             }
//         });
//         registrationIds.push(token);
//         sender.send(message, registrationIds, 4, function (err, result) {
//             if(err) throw err;
//             else{
//               mongo.Article.update({articleKey : articleKey}, {waiting : true}, function(err, numAffected){
//                 res.sendStatus(200);
//                 console.log(result);
//               })
//             }
//         });
//       }
//   });
// })
