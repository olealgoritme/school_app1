var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');

var indexRouter = require('./routes/index.js');
var cityRouter = require('./routes/city.js');
var countryRouter = require('./routes/country.js');

var app = express();
var router = express.Router();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// mysql db connection setup
app.use(function(req, res, next) {
	res.locals.connection = mysql.createConnection({
  	host     : 'localhost',
		user     : 'xuw',
		password : 'ughpower',
		database : 'world'
	});
	res.locals.connection.connect();
	next();
});

// routes
app.use('/', indexRouter);
app.use('/city', cityRouter);
app.use('/country', countryRouter);

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
