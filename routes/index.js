var express = require('express');
var router = express.Router();
const profilesCtrl = require('../controller/profiles')
const isLoggedIn = require('../config/auth');
const Profile = require('../models/profile');
const Instrument = require('../models/instrument');
const passport = require('passport');



router.get('/', function(req, res, next) {
  res.render('landing');
});

router.get('/profiles/instructors', isLoggedIn, function(req, res) {
  Profile.find({})
  .populate('instruments') 
  .exec(function(err, profile) {
      res.render('profiles/instructors/index', 
      { title: 'Instructors', 
      profile
     });
  })
});

router.get('/profiles/instructors/:id', profilesCtrl.showInstructor)



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
    successRedirect: '/profiles/instructors',
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
