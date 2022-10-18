var express = require('express');
var router = express.Router();
const Profile = require('../models/profile');
const passport = require('passport');

router.get('/', (req, res) => {
  res.render('landing');
});
router.get('/about', (req, res) => {
  res.render('about');
});
router.get('/contact', (req, res) => {
  res.render('contact');
});

router.get('/auth/google', passport.authenticate(
  'google',
  {
    scope: ['profile', 'email'],
  }
));

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    failureRedirect: '/landing'
  }
), async (req, res) => {
  const profile = await Profile.findOne({ user: req.user._id });
  if (!profile)
    return res.redirect('/profiles/new');
  if (profile.isInstructor)
    return res.redirect(`/profiles/instructor/${profile._id}`);
  if (!profile.isInstructor)
    return res.redirect(`/profiles/student/${profile._id}`);
});

router.get('/logout', (req, res) => {
  req.logout((err) => {
    res.redirect('/');
  });
});

module.exports = router;
