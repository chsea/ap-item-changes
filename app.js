var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware');
var swig = require('swig');

var app = express();

app.engine('html', swig.renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(
//   sassMiddleware({
//     src: __dirname + '/assets',
//     dest: __dirname + '/public',
//     debug: true
//   })
// );
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes'));
app.use('/champions', require('./routes/champions'));

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Listening at http://%s:%s', host, port);
});


module.exports = app;
