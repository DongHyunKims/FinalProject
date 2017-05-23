const express = require('express');
const router = express.Router();

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session')
const flash = require('connect-flash')


const User = require('../../database/model/user');


const bodyParser = require('body-parser');

router.use(express.static('public'));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended : true}));


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


router.post('/login', function(req, res, next){
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


passport.use('local-register', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, username, password, done){
  console.log('local-join callback called')

  User.findOne({email:username}, function(err, user){
    if(err){
      return done(err);
    }

    if(user){
      console.log("기존계정 존재")
      return done(null, false, { message: '기존계정 존재' })
    }else{

      //비밀번호 재확인이 동일한지 확인

      console.log(req.body.email)

      let regex = /^\w+\@\w+\.\w+$/;

      if(!regex.test(req.body.email)){
        console.log("email 형식이 아닙니다.")
        return done(null, false, { message: 'email 형식이 아닙니다' })
      }

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

router.post('/register', function(req, res, next){
  passport.authenticate('local-register',function(err, user, info){
    if(err) res.status(500).json(err);
    if(!user){return res.status(400).json(info.message);}
    return res.json(user)
  })(req, res, next);
})


router.get('/logout', function(req, res){
  req.logout();
  console.log("asdfasdfasdfa");
  res.redirect("/auth/login");
  //res.json("success")
});

module.exports = router;
