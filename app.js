var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var User = require('./models/user');
var jwt = require("jsonwebtoken");
var auth = require('./controllers/authController');

var index = require('./routes/index');
var users = require('./routes/users');
var api = require('./routes/api');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//authentication middlware
app.use(function (req, res, next) {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')==='JWT'){
      jwt.verify(req.headers.authorization.split(' ')[1], 'BLOG_POST_KEY', function (err, decode) {
        if (err) req.user = undefined;
        req.user = decode;
        next();
      })
  }else{
      req.user =undefined;
      next();
  }
});


app.use('/', index);
app.use('/users', users);
app.use('/api/', api);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
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


app.listen(3000);
console.log('Started Development server on port 3000');

process.on('uncaughtException', function (error) {
    console.log(error.stack);
});
module.exports = app;
