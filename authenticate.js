var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./Models/user');

passport.use(new LocalStrategy({
    usernameField: 'email'
  },User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



