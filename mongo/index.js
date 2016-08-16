var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/Alime');

var userSchema = mongoose.Schema({
    id: {type: String},
    userid: {type: String},
    password: {type: String},
    username: {type: String},
    isAdmin: {type: Boolean},
    attendType: {type: Number}
});
var quesSchema = mongoose.Schema({
    articleid: {type: String},
    title: {type: String},
    date: {type: Date},
    content: {type: String},
    reply: {type: String},
    author: {type: String},
    password: {type: String}
});
var User = mongoose.model("User", userSchema);
var Question = mongoose.model("Question", quesSchema);
exports.mongoose = mongoose;
exports.db = db;
exports.User = User;
exports.Question = Question;