var createError = require('http-errors');
var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var satelliteimageRouter = require('./routes/satelliteimage');
var modelRouter = require('./routes/model');
var trainDataRouter = require('./routes/trainData');
var areaRouter = require('./routes/area');
var analyseRouter = require('./routes/analyse');
var impressumRouter = require('./routes/impressum');
var demoRouter = require('./routes/demo');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/satelliteimage', satelliteimageRouter);
app.use('/model', modelRouter);
app.use('/trainData', trainDataRouter);
app.use('/area', areaRouter);
app.use('/analyse', analyseRouter);
app.use('/impressum', impressumRouter);
app.use('/demo', demoRouter);

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