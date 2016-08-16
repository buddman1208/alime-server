var port = 2000;

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var http = require('http').Server(app);
var mongo = require('./mongo');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

module.exports = app;

require('./routes/auth')(app, mongo);
http.listen(port, function () {
    console.log('Alime Server running on Port ' + port);
});
