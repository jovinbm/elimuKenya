/**
 * Created by jovinbm on 2/14/15.
 */
var express = require('express');
var app = require('express')();
var server = require('http').Server(app);
var http = require('http');
var port = process.env.PORT || 4000;
var logger = require('morgan');
var crypto = require('crypto');
var mkdirp = require('mkdirp');
var fsExists = require('fs-exists');
var fs = require('fs');
var request = require('request');

var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(logger('dev'));


app.get('*', function (req, res) {

    if (req.url == '/') {
        req.url = '/index.html';
    }

    var filepath = path.join(__dirname, '/caches' + req.url);

    var rest = filepath.substring(0, filepath.lastIndexOf("/") + 1);
    if (!(fs.existsSync(rest))) {
        mkdirp(rest);
    }

    fsExists(filepath, function (err, result) {
        if (err) {
            throw err;
        } // err will always be null
        if (result) {
            console.log("the entry exists");
            res.sendFile(filepath);
        }
        else {
            console.log("the entry does not exist");
            if (req.url == '/index.html') {
                var seekNew = request('http://localhost:3000/').pipe(fs.createWriteStream(filepath));
                seekNew.on('close', function () {
                    res.sendFile(filepath);
                });
            } else {
                if (!(fs.existsSync(rest))) {
                    mkdirp(rest);
                }
                var seekNew = request('http://localhost:3000' + req.url).pipe(fs.createWriteStream(filepath));
                seekNew.on('close', function () {
                    res.sendFile(filepath);
                });
            }
        }
    });
});

server.listen(port, console.log("Server listening at port: " + port));
