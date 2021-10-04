var createError = require('http-errors');
var cookieSession = require('cookie-session');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan'); //zrzucanie logów w trybie developerskim
var config = require('./routes/config');
const mongoose = require('mongoose');

mongoose.connect(config.db);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
// db.once('open', ()=> {
//   console.log('db connect');
// });

var indexRouter = require('./routes/index'); //deklaracja rutingu
var newsRouter = require('./routes/news'); //deklaracja rutingu
var quizRouter = require('./routes/quiz'); //deklaracja rutingu
var adminRouter = require('./routes/admin'); //deklaracja rutingu
var apiRouter = require('./routes/api'); 

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views')); // katalog do szablonów
app.set('view engine', 'pug'); // silnik do szablonów pug

app.use(logger('dev')); //przekazywanie dalszych midleewarse
app.use(express.json()); // parsowanie jsona od razu w body
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // deklaracja katalogu statycznego z assetami  np css js html - to co ma być publiczne

app.use(cookieSession({
  name: 'session',
  keys: config.keySession,

  // Cookie Options
  maxAge: config.maxAgeSession // 24 hours
}))

app.use(function(req,res, next) {
  res.locals.path = req.path;

  next();
});

app.use('/', indexRouter); // wywołanie rutingu
app.use('/news', newsRouter); // wywołanie rutingu
app.use('/quiz', quizRouter); // wywołanie rutingu
app.use('/admin', adminRouter); // wywołanie rutingu
app.use('/api', apiRouter); // wywołanie rutingu

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;