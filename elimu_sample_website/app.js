var express = require('express');
var app = require('express')();
var server = require('http').Server(app);
var http = require('http');
var port = process.env.PORT || 3000;
var logger = require('morgan');
var fs = require('fs');
var request = require('request');

var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, '/public')));


server.listen(port, console.log("Server listening at port: " + port));
exports.app = app;
