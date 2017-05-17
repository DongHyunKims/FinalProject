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

const User = require('./database/model/user');


const dbConnection = require('./database/db');


const index = require('./routes/index');
const users = require('./routes/users');
const playList = require('./routes/playList/index');
const sign = require('./routes/sign/index');
const albumList = require('./routes/albumList/index');


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



passport.serializeUser(function(user, done) {
  console.log('passport session save : ', user.id);
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  console.log('passport session get id : ', id);
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, username, password, done) {
    console.log('local-login callback called')
    //console.log(username, password)
    User.findOne({ email: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        console.log("username")
        return done(null, false, { message: 'Incorrect username.' });
      }

      if (user.password != password) {
        console.log("password")
        return done(null, false, { message: 'Incorrect password.' })
      }

      // if (!user.validPassword(password)) {
      //   return done(null, false, { message: 'Incorrect password.' });
      // }

      console.log("login success")
      return done(null, user);
    });

  }
));

//최정 처리된 결과에 따라 리다이렉트
// app.post('/login', passport.authenticate('local-login', {
//   successRedirect: '/',
//   failureRedirect: '/auth/login',
//   failureFlash: true
// }));


app.post('/login', function(req, res, next){
  passport.authenticate('local-login',function(err, user, info){
    if(err) res.status(500).json(err);
    if(!user){return res.status(400).json(info.message);}
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      let info = {
        email:user.email,
        id:user.id
      }
      return res.json(info);
    });

  })(req, res, next);
})


// app.post('/login', function(req, res){
//   console.log(req.body)
//
// })


passport.use('local-register', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, username, password, done){
  console.log('local-join callback called')
  console.log(req.body)

  User.findOne({email:username}, function(err, user){
    if(err){
      return done(err);
    }

    console.log(user)

    if(user){
      console.log("기존계정 존재")
      return done(null, false, { message: '기존계정 존재' })
    }else{

      //비밀번호 재확인이 동일한지 확인

      if(password !== req.body.confirmPassword){
        console.log("비밀번호 재확인해주세요")
        return done(null, false, { message: '비밀번호 재확인' })
      }

      let user = new User({
          email : username,
          password : password
        })
      user.save(function(err){
        if(err) {throw err;}
        console.log("user data 추가됨");
        return done(null, user);
      })
    }

  })

}))

app.post('/register', function(req, res, next){
  passport.authenticate('local-register',function(err, user, info){
    if(err) res.status(500).json(err);
    if(!user){return res.status(400).json(info.message);}
    return res.json(user)
  })(req, res, next);
})


app.get('/logout', function(req, res){
  req.logout();
  res.json("success")
});



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
