var ejs = require('ejs');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var _basePath = __dirname + "/../";

global._basePath = _basePath;
var app = {
    express: express()
};
global.app = app;

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'trucker',
  debug    :  false
});
global.db = connection;


app.express.set('views', _basePath + './client/');
app.express.set('view engine', 'ejs');
app.express.use(bodyParser.json());
app.express.use(session({secret: 'reqrutment123'}));

//app.express.use('/index.html', express.static(_basePath + 'client/index.html'));
app.express.use('/css', express.static(_basePath + 'client/css'));
app.express.use('/js', express.static(_basePath + 'client/js'));
app.express.use('/templates', express.static(_basePath + 'client/templates'));
app.express.set('/node_modules', express.static(_basePath + 'node_modules'));

var controllers = require(__dirname + '/controllers/controller.js');
controllers(app.express);

var server = app.express.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});