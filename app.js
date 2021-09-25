var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');  //zrzucanie logów w trybie developerskim

var indexRouter = require('./routes/index'); //deklaracja rutingu
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));  // katalog do szablonów
app.set('view engine', 'pug');  // silnik do szablonów pug

app.use(logger('dev'));  //przekazywanie dalszych midleewarse
app.use(express.json()); // parsowanie jsona od razu w body
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // deklaracja katalogu statycznego z assetami  np css js html - to co ma być publiczne

app.use('/', indexRouter);  // wywołanie rutingu
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
