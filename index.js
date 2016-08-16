var port = 2000;

var express = require('express');
var bodyParser = require('body-parser');
var mongodb = require('./mongo');
var randomstr = require('randomstring');
var app = express();
var http = require('http').Server(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

module.exports = app;

require('./routes/auth')(app, mongodb, randomstr);
require('./routes/question')(app, mongodb, randomstr);
http.listen(port, function () {
    console.log('Alime Server running on Port ' + port);
});
