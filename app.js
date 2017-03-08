var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var index = require('./routes/index');
var user = require('./routes/user');
var device = require('./routes/device');
var murid = require('./routes/murid');
var guru = require('./routes/guru');
var wali = require('./routes/wali');

var fixvalue = require('./utils/fixvalue.json')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use(fixvalue.RouterAPIV1.users, user);
app.use(fixvalue.RouterAPIV1.devices, device);
app.use(fixvalue.RouterAPIV1.murid, murid);
app.use(fixvalue.RouterAPIV1.guru, guru);
app.use(fixvalue.RouterAPIV1.wali, wali);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error(fixvalue.Pesan.strTidakAda);
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next)
{
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render(fixvalue.Pesan.strError);
});

// Connect to mongoose
mongoose.Promise = global.Promise;
mongoose.connect(fixvalue.Database.strMongoDB + fixvalue.Database.strSchema, function (err, db)
{
  if(err)
    throw err;
});

module.exports = app;
