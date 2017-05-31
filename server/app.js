const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session')
const flash = require('connect-flash')

const dbConnection = require('./database/db');

const index = require('./routes/index');
const users = require('./routes/users');
const playList = require('./routes/playList/index');
const sign = require('./routes/sign/index');
const albumList = require('./routes/albumList/index');
const auth = require('./routes/auth/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret:'keyboard cat', // sesseion을 암호하기 위한 키값
  resave:false,
  saveUninitialized:true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use('/', index);
app.use('/users', users);
app.use('/playList', playList);
app.use('/sign', sign);
app.use('/albumList', albumList);
app.use('/auth', auth);

// catch 404 and forward to error handler
app.use(function(req, res, next) {

  let err = new Error('Not Found');
  err.status = 404;
  next(err);
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


// 데이터베이스 연결
dbConnection();

module.exports = app;
