var createError = require('http-errors');
var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


var indexRouter = require('./routes/index');
var satelliteimageRouter = require('./routes/satelliteimage');
var trainModelRouter = require('./routes/trainModel');
var addTrainDataRouter = require('./routes/addTrainData');
var areaRouter = require('./routes/area');
var wikiRouter = require('./routes/wiki');
var demoRouter = require('./routes/demo');
var impressumRouter = require('./routes/impressum');
var projectRouter = require('./routes/project');
var updateTrainDataRouter = require('./routes/updateTrainData');
var aoaRouter = require('./routes/aoa');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(path.join(__dirname, 'tests')));
app.use(express.static(path.join(__dirname, 'public/images')));
app.use(express.static(path.join(__dirname, 'database')));

//cors
app.use(cors());

app.use('/', indexRouter);
app.use('/satelliteimage', satelliteimageRouter);
app.use('/trainModel', trainModelRouter);
app.use('/updateTrainData', updateTrainDataRouter);
app.use('/area', areaRouter);
app.use('/demo', demoRouter);
app.use('/wiki', wikiRouter);
app.use('/impressum', impressumRouter);
app.use('/project', projectRouter);
app.use('/addTrainData', addTrainDataRouter);
app.use('/aoa', aoaRouter);

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