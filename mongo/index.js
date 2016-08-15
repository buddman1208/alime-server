var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/Repay');

var userSchema = mongoose.Schema({
  id : { type : String },
  password : { type : String },
  name : { type : String },
  apikey : { type : String },
  isLogin : { type : Boolean },
  isParent : { type : Boolean },
  article : { type : Array }
});

var articleSchema = mongoose.Schema({
    title : { type : String }, 
	content : { type : String }, 
	apikey : { type : String }, 
	articleKey : { type : String }
});

var User = mongoose.model("User", userSchema);
var Article = mongoose.model("Article", articleSchema);
exports.mongoose = mongoose;
exports.db = db;
exports.userSchema = userSchema;
exports.User = User;
exports.Article = Article;
