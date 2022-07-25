var express = require('express');
var router = express.Router();
const passport = require('passport');
const indexCtrl = require('../controller/index');


router.get('/', function(req, res, next) {
  res.render('landing');
});

// GET /landing/new (/new)
router.get('/new', indexCtrl.new);

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  {
    scope: ['profile', 'email'],
    // Optionally force the user to pick account every time
    // prompt: 'select_account'
  }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/',
    failureRedirect: '/'
  }
));

// Logout route
router.get('/logout', function(req, res) {
  req.logout(function(err) {
    res.redirect('/');
  });
});

module.exports = router;
