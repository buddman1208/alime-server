var port = 5000;

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var bodyParser = require('body-parser');

var app = express();
var http = require('http').Server(app);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
module.exports = app;
http.listen(port, function(){
    console.log('Alime Server running on Port ' + port);
});
