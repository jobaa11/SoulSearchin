var express = require('express');
var router = express.Router();
const profilesCtrl = require('../controller/profiles')
const isLoggedIn = require('../config/auth');
const Profile = require('../models/profile');
const Instrument = require('../models/instrument');
const passport = require('passport');

router.get('/', async (req, res, next) => {
  res.render('landing');
});
router.get('/about', (req, res) => {
  res.render('about');
});
router.get('/contact', (req, res) => {
  res.render('contact');
});

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
    failureRedirect: '/landing'
  }
), async (req, res, next) => {
  const profile = await Profile.findOne({ user: req.user._id });
  if (!profile)
    return res.redirect('/profiles/new');
  if (profile.isInstructor)
    return res.redirect(`/profiles/instructor/${profile._id}`);
  if (!profile.isInstructor)
    return res.redirect(`/profiles/student/${profile._id}`);

});


// Logout route
router.get('/logout', (req, res) => {
  req.logout((err) => {
    res.redirect('/');
  });
});

module.exports = router;
