var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override');

require('dotenv').config();
require('./config/database');
require('./config/passport');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var profilesRouter = require('./routes/profiles');
var instrumentsRouter = require('./routes/instruments');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

const profileCheck = require('./config/profile-check');
app.use(profileCheck);

app.use((req, res, next) => {
  res.locals.profile = req.profile;
  next();
});

const isLoggedIn = require('./config/auth');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/profiles', isLoggedIn, profilesRouter);
app.use('/instruments', isLoggedIn, instrumentsRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
