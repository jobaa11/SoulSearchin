var express = require('express');
var router = express.Router();
const profilesCtrl = require('../controller/profiles')
const isLoggedIn = require('../config/auth');
const Profile = require('../models/profile');
const Instrument = require('../models/instrument');
const passport = require('passport');



router.get('/', (req, res, next) => {
    Profile.find({}, (err, profileDoc) => {
        res.render('landing', { profileDoc });
      });
  });
router.get('/about', (req, res) => {
    res.render('about');
  })
router.get('/contact', (req, res) => {
    res.render('contact');
  })

// router.get('/profiles/instructors', isLoggedIn, (req, res) => {
//     Profile.find({isInstructor: true})
//       .populate('instruments')
//       .exec(function (err, profile) {
//         res.render('profiles/instructors/index',
//           {
//             title: 'Instructors',
//             profile
//           });
//       });
//   });

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
    failureRedirect: '/'
  }
), async (req, res, next) => {
    const profile = await Profile.findOne({ user: req.user._id });
    console.log(profile, 'we are here', req.body)
    if (!profile)
      return res.redirect('/');
    if (profile.isInstructor)
      return res.redirect('/profiles/instructor/home');
    if (!profile.isInstructor)
      return res.redirect('/profiles/student/home');
      
  });


// Logout route
router.get('/logout', (req, res) => {
    req.logout((err) => {
      res.redirect('/');
    });
  });

module.exports = router;
