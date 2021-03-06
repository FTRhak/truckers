/*global __dirname:true, global:true */

var ejs = require('ejs');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var fs = require('fs');
var md5 = require('md5');
var validator = require('validator');
var nodemailer = require('nodemailer');
var settings = require('./settings');
var _basePath = __dirname + "/../";

global.settings = settings;
global.md5 = md5;
global.validator = validator;
global.nodemailer = nodemailer;
global.mongoose = require('mongoose');

global._basePath = _basePath;
var app = {
    express: express(),
    models: {},
    mailer: {}
};
global.app = app;
global.DEBUD = true;

mongoose.connect('mongodb://' + settings.db.host + '/' + settings.db.database, settings.db.options);
var db = mongoose.connection;
db.on('error', function (err) {
    console.error('\x1b[31m%s\x1b[0m: ','Connection DB error:', err.message);
});
db.once('open', function callback() {
    DEBUD && console.log('\x1b[33m%s\x1b[0m: ', "Connected to DB! ", "");
});
global.db = db;

app.express.set('views', _basePath + './client/view/');
app.express.set('view engine', 'ejs');

// parse an HTML body into a string
//app.express.use(bodyParser.text({ type: 'text/html' }));
//app.express.use(bodyParser.text({ type: 'application/json' }));
//app.express.use(bodyParser.text({ type: 'text/plain' }));

// parse application/x-www-form-urlencoded
//app.express.use(bodyParser.urlencoded({ extended: false }))

app.express.use(bodyParser.json());

app.express.use(session({ secret: 'dev-truckers-session' }));

//app.express.use('/index.html', express.static(_basePath + 'client/index.html'));

app.express.use('/js-libs/core-js', express.static(_basePath + 'node_modules/core-js/'));
app.express.use('/js-libs/zone-js', express.static(_basePath + 'node_modules/zone.js/'));
app.express.use('/js-libs/systemjs', express.static(_basePath + 'node_modules/systemjs'));
app.express.use('/js-libs/rxjs', express.static(_basePath + 'node_modules/rxjs'));

app.express.use('/@angular/theme', express.static(_basePath + 'node_modules/@angular/material/core/theming'));
app.express.use('/@angular/localization', express.static(_basePath + 'node_modules/angular2localization/bundles/'));
app.express.use('/@angular', express.static(_basePath + 'node_modules/@angular'));

//TODO remove
app.express.use('/node_modules', express.static(_basePath + 'node_modules/'));


app.express.use('/languages', express.static(_basePath + 'client/languages'));
app.express.use('/fonts', express.static(_basePath + 'client/fonts'));
app.express.use('/css', express.static(_basePath + 'client/css'));
app.express.use('/js', express.static(_basePath + 'client/js'));
app.express.use('/icons', express.static(_basePath + 'client/icons'));
app.express.use('/templates', express.static(_basePath + 'client/templates'));
//app.express.set('/node_modules', express.static(_basePath + 'node_modules'));

var models = require(__dirname + '/models/model.js');
models(app.models);

var mcontrollers = require(__dirname + '/mailcontrollers/controller.js');
mcontrollers(app.mailer);

var controllers = require(__dirname + '/controllers/controller.js');
controllers(app.express);

app.express.get('/api/*', function (req, res) {
    res.status(404);
    res.render('404_ajax', { "msg": "Error API" });
});
app.express.post('/api/*', function (req, res) {
    res.status(404);
    res.render('404_ajax', { "msg": "Error API" });
});

app.express.get('*', function (req, res) {
    if (req.headers['content-type'] !== 'application/json') {
        res.render('index', { title: 'Hey', message: 'Hello there!' });
    } else {
        console.log("404");
        res.status(404);
        res.render('404', { "msg": "Error" });
    }

});

var server = app.express.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    DEBUD && console.log('Example app listening at http://%s:%s', host, port);
});
module.exports = server;